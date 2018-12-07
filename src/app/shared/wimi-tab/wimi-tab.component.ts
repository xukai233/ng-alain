import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'wimi-tab',
  templateUrl: './wimi-tab.component.html',
  styleUrls: ['./wimi-tab.component.less']
})
export class WimiTabComponent implements OnInit {
  @Input() tabs;
  @Input() select;

  @Output() onSelect = new EventEmitter<any>();
  selectTab = ""
  constructor() { }

  ngOnInit() {
    this.selectTab = this.select
  }
  handleTabSelect(tab){
    this.selectTab = tab;
    this.onSelect.emit(tab);
  }
}
