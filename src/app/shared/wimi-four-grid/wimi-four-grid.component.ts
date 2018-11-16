import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'wimi-four-grid',
  templateUrl: './wimi-four-grid.component.html',
  styleUrls: ['./wimi-four-grid.component.less']
})
export class WimiFourGridComponent implements OnInit {
  @Input() leftWidth:string = "260px";
  constructor() { }

  ngOnInit() {
    console.log(this.leftWidth)
  }

}
