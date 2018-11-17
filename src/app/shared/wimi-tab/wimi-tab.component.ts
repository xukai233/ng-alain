import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'wimi-tab',
  templateUrl: './wimi-tab.component.html',
  styleUrls: ['./wimi-tab.component.less']
})
export class WimiTabComponent implements OnInit {
  @Input() tabs;
  @Input()
  get select(){
   return this.selectTab;
  }
  set select(val:string){
    this.selectTab = val;
    this.handleTabSelect(val)
  }

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
