import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'wimi-app-board',
  templateUrl: './wimi-app-board.component.html',
  styleUrls: ['./wimi-app-board.component.less']
})
export class WimiAppBoardComponent implements OnInit {
  @Input() data = {}
  @Output() onEdit = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleEditClick(){
    this.onEdit.emit(this.data);
  }
}
