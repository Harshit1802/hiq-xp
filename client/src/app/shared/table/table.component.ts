import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GridColumn, PageAction } from 'src/app/models/renderer';


interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() listOfColumn: GridColumn[] = [];
  @Input() gridData: any[] = [];
  @Output() pageSizeChanged = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<any>();
  @Input() pagination = {
    page: 1,
    size: 10,
    total: 0
  };
  pages = [10, 25, 50, 100]
  constructor() { }

  ngOnInit(): void {
    console.log(this.listOfColumn);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridData && this.gridData.length > 0) {
      this.gridData = JSON.parse(JSON.stringify(this.gridData));
    }
  }
  sizeChange() {
    this.pagination.page = 1;
    this.pageSizeChanged.emit(this.pagination);
  }
  pageChange(page: number) {
    this.pagination.page = page;
    this.pageSizeChanged.emit(this.pagination);
  }
  actionItemClick(actionType: PageAction, data: any) {
    this.actionClick.emit({ actionType: actionType, data: data })
    
  }
 
 
}
