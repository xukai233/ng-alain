import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'wimi-left-menu',
  templateUrl: './wimi-left-menu.component.html',
  styleUrls: ['./wimi-left-menu.component.less']
})
export class WimiLeftMenuComponent implements OnInit {
  @Input() menu;
  @Input() select:number|string;
  @Output() onSelect = new EventEmitter<any>();
  @Output() onChangeName = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSetDefault = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleMenuClick(menu){
    this.select = menu.id;
    this.onSelect.emit(menu);
  }

  handleChangeName(item){
    this.onChangeName.emit(item);
  }
  handleDelete(item){
    this.onDelete.emit(item);
  }
  handleSetDefault(item){
    this.onSetDefault.emit(item);
  }
}
