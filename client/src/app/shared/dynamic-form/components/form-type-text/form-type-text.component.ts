import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ControlConfig } from 'src/app/models/renderer';
import { Field } from '../../models/field.interface';

@Component({
  selector: 'app-form-type-text',
  templateUrl: './form-type-text.component.html',
  styleUrls: ['./form-type-text.component.less']
})
export class FormTypeTextComponent implements Field, OnInit {
 
  config!: ControlConfig;
  group!: FormGroup;
  ngOnInit(): void {
  }

  onFileChange(file){
    this.config.value=file;
    //this.group.patchValue(file-upload,file);
    this.group.get(this.config.fieldId).patchValue(file);
  }
}
