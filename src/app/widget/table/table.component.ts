import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() columns: { key: string, title: string }[] = [];
  @Input() data: any[] = [];
  @Input() actions: { key: string, title: string, action: (item: any) => void }[] = [];
  @Input() selectedData:any;
  @Output() selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() {
    this.initializeSelection();
   }

   initializeSelection(): void {
    this.data.forEach(row => row.selected = false);
  }

  ngOnInit(): void {
  }

  onCheckboxChange(row: any): void {
    const selectedItems = this.data.filter(item => item.selected);
    this.selectedItemsChange.emit(selectedItems);
  }
}
