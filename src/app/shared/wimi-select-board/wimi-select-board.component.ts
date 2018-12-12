import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'wimi-select-board',
  templateUrl: './wimi-select-board.component.html',
  styleUrls: ['./wimi-select-board.component.less']
})
export class WimiSelectBoardComponent implements OnInit {
  @Input() select = false;
  @Input() title = "默认"
  @Input() type = "default"
  @Output() onButtonClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  handleClick(){
    this.onButtonClick.emit();
  }

}
