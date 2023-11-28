import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ta_IN } from 'ng-zorro-antd/i18n';
import { take } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { GridColumn, Page, PageAction } from 'src/app/models/renderer';
import { EventBusService } from 'src/app/services/event-bus.service';
import { RendererService } from 'src/app/services/renderer.service';
import { PopupRendererComponent } from '../popup-renderer/popup-renderer.component';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.less']
})
export class RendererComponent implements OnInit, OnChanges, OnDestroy {
  @Input() jsonFileName: string = '';

  id: string = '';
  page?: Page = undefined;
  listOfColumn: GridColumn[] = [];
  gridData: any[] = [];
  gridDataSource: string = '';
  pageAction: PageAction = {} as PageAction;
  isFilter = false;

  errors:any;
  //subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private rendererService: RendererService,
    public dialog: MatDialog) { }
  ngOnDestroy(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.jsonFileName && this.jsonFileName.length > 0) {
      this.id = this.jsonFileName;
      this.getJsonObj();
    }
  }
  ngOnInit(): void {

    // else if (this.route.snapshot.paramMap.get('id')) {
    //   this.id = this.route.snapshot.paramMap.get('id') ?? '';
    // }
    this.getJsonObj();


  }

  getJsonObj() {
    if (this.id && this.id.length > 0) {
      this.rendererService.getPageJson(this.id + '.json').subscribe((json) => {
        this.page = json;
        if (this.page.table && this.page.table.tableColumns.length > 0) {
          this.listOfColumn = this.page.table.tableColumns;
          this.gridDataSource = this.page.table.dataSource;
          if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
            this.bindGrid();
          }
        }
      });
    }
  }
  bindGrid() {
    this.errors=null;
    this.rendererService.getData(this.gridDataSource).subscribe(data => {
      this.gridData = data.data;
    }, err => {
      this.errors = err.error.msg;
    });
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }
  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
  actionClick(action: PageAction) {
    if (action) {
      if (action.action == 'filter') {
        this.isFilter = !this.isFilter;
      }
      else if (action.event?.onevent == 'popup') {
        this.openPopup(action, null);
      }
    }

  }
  openPopup(action: PageAction, defaultData: any) {
    const dialogRef = this.dialog.open(PopupRendererComponent, {
      width: action.event.popupwidth ? action.event.popupwidth : '40%',
      data: {
        pageAction: action,
        defaultData: defaultData ? defaultData : null,
        id: defaultData ? defaultData._id : ''
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  tableActionClick(event: any) {
    const action = event.actionType as PageAction;
    const rowData = event.data;
    if (action.event?.onevent == 'api-get') {
      //call get api
      this.rendererService.getData(action.event.api).subscribe(data => {
        console.log(data);
      });
    }
    if (action.event?.onevent == 'popup') {
      this.openPopup(action, rowData);
    }
  }
}
