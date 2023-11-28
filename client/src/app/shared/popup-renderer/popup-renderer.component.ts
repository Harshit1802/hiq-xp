import { Component, Inject, OnInit } from '@angular/core';
import { ControlConfig } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Button, Buttons } from 'src/app/models/Constant';
import { GridColumn, Page, PageAction } from 'src/app/models/renderer';
import { EventBusService } from 'src/app/services/event-bus.service';
import { RendererService } from 'src/app/services/renderer.service';
import { MessageBox } from '../components/message-box/message-box.provider';

@Component({
  selector: 'app-popup-renderer',
  templateUrl: './popup-renderer.component.html',
  styleUrls: ['./popup-renderer.component.less']
})
export class PopupRendererComponent implements OnInit {
  pageAction: PageAction = {} as PageAction;
  defaultData: any;
  popupJson: any;
  parentId: string = '';

  page?: Page = undefined;
  listOfColumn: GridColumn[] = [];
  gridData: any[] = [];
  gridDataSource: string = '';
  clickSubject: Subject<any> = new Subject();
  postApi = '';
  postSchema: any = undefined;
  errors: any;

  initialData: any;
  constructor(
    public dialogRef: MatDialogRef<PopupRendererComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rendererService: RendererService,
    public dialog: MatDialog,
    private mb: MessageBox) {

    if (data && data.pageAction) {
      this.pageAction = data.pageAction;
      this.defaultData = data.defaultData;
      this.parentId = data.id;
      this.popupJson = this.pageAction.event?.popupJson;
    }
  }
  ngOnInit(): void {
    this.getJsonObj();
  }

  getJsonObj() {
    if (this.popupJson && this.popupJson.length > 0) {
      this.rendererService.getPageJson(this.popupJson + '.json').subscribe((json) => {
        this.page = json;
        if (this.page.popupConfig.defaultData == 'parent') {

          this.setDefaultValues(this.defaultData);
        }

        if (this.page.table && this.page.table.tableColumns.length > 0) {
          this.listOfColumn = this.page.table.tableColumns;
          this.gridDataSource = this.page.table.dataSource;
          if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
            this.bindGrid();
          }
        }
      },
        (err: any) => {
          this.errors = err.error.msg;
        }
      );

    }
  }

  setDefaultValues(data) {
    let i = 0;
    this.page.formConfig.rows.forEach(row => {
      row.columns.forEach(col => {
        col.controls.forEach(control => {
          if (i == 0) {
            col.controls.push({
              id: 'hdnId',
              type: 'hidden',
              fieldId: '_id',
              value: data['_id'],
              isVisible: false
            });
            i = i + 1;
          }
          control.value = data[control.fieldId];

        });
      });
    });
    console.log('test', this.page.formConfig);
  }
  bindGrid() {
    this.errors = null;
    this.rendererService.getData(this.gridDataSource).subscribe(data => {
      this.gridData = data.data.users;
    }, err => {
      this.errors = err.error.msg;
    });
  }

  // submit(value: { [name: string]: any }) {
  //   console.log('form-submit11', value);

  // }
  formSubmit(event) {
    this.errors = null;
    console.log('form-submit', event);
    let formData = event;
    if (this.postSchema) {
      for (const key in this.postSchema) {
        if (key == 'uploadedFiles') {
          let files = formData[this.postSchema[key].replace('[', '').replace(']', '')];
          let arrFiles = [];
          if (files && files.length > 0) {
            files.forEach(file => {
              arrFiles.push({
                base64String: file.base64String,
                lastModifiedDate: file.lastModifiedDate,
                name: file.name,
                size: file.size,
                type: file.type
              });
            });
            formData.uploadedFiles = arrFiles;
            formData[this.postSchema[key].replace('[', '').replace(']', '')] = null;
          }
        }
        else if (this.postSchema[key].startsWith('[') && this.postSchema[key].indexOf(']') > 0) {
          const value = this.postSchema[key].replace('[', '').replace(']', '') == 'parentId' ? this.parentId : this.postSchema[key].replace('[', '').replace(']', '');
          this.postSchema[key] = value;
        }
        if (formData[key] == undefined) {
          formData[key] = this.postSchema[key];
        }
      }
    }

    this.rendererService.postData(this.postApi, formData).subscribe(x => {
      //this.dialogRef.close('closeandrefreshparent');
      console.log(x);
      this.openMessageBox(Buttons.Ok, 'closeandrefreshparent', 'Success', x.msg);
    },
      (err) => {
        this.errors = err.error.msg;
      });
  }

  popupActionClick(action: PageAction, event: Event) {
    if (action.event?.onevent == 'closeandrefreshparent') {
      this.dialogRef.close('closeandrefreshparent');
    }
    else if (action.event?.onevent == 'postformdata') {
      this.postApi = action.event.api;
      this.postSchema = action.event.postSchema;
      this.clickSubject.next(event);
    }
  }

  openMessageBox(buttons: Buttons, actionOnParent, title: string, message: string) {
    let dialog = this.mb.show(message, title, buttons);

    dialog.dialogResult$.subscribe(result => {
      console.log("Button pressed: ", Button[result]);
      // IF OK
      if (Button[result] == 'Ok') {
        if (actionOnParent == 'closeandrefreshparent') {
          this.dialogRef.close('closeandrefreshparent');
        }
        else if (actionOnParent == 'close') {
          this.dialogRef.close();
        }
      }
    });

  }
}
