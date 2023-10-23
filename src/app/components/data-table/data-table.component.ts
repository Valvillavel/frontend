import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() columns:any
  @Input() listRows:any
  @Output() itemSelect=new EventEmitter<any>();
  @ViewChild('tables') table:any;
  rows = [];
  selected = [];
  items:any;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  expanded: any = {};
  timeout: any;
  error=false;

  constructor(
    private router: Router,
    private service:ServiceService,
  ) { }

  ngOnInit() {
    this.rows=this.listRows
    console.log(this.rows)
    console.log(this.columns);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.listRows= changes.listRows.currentValue;
    this.rows=this.listRows
    this.selected=[]
  }
  onSelect({ selected }) {
 
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.itemSelect.emit(this.selected)
  }
  onActivate(event) {
  }
  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
  toggleExpanRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event){
    console.log('Detail Toggle', event);
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.listRows.filter(function (d) {
      return d.nametoLowerCase().indexOf(val) !== -1 || !val;
   });
   this.rows = temp;
  }

}
