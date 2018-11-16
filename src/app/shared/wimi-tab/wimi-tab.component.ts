import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'wimi-tab',
  templateUrl: './wimi-tab.component.html',
  styleUrls: ['./wimi-tab.component.less']
})
export class WimiTabComponent implements OnInit {
  @Input() tabs;
  @Input() select:string;
  @Output() onSelect = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleTabSelect(tab){
    this.select = tab;
    this.onSelect.emit(tab);
  }
}
