import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'wimi-app-board',
  templateUrl: './wimi-app-board.component.html',
  styleUrls: ['./wimi-app-board.component.less']
})
export class WimiAppBoardComponent implements OnInit {
  @Input() data = {
    title:"CPS-MDC",
    type:"定制版",
    key:"a1AB7T4bFlg",
    status:"已逾期",
    base:"2018-11-6 ~ 2019-11-5",
    pay:"未授权"
  }
  @Output() onEdit = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleEditClick(){
    this.onEdit.emit(this.data);
  }
}
