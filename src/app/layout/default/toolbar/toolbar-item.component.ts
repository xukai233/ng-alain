import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'layout-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.less']
})
export class ToolbarItemComponent implements OnInit {

  @Input() icon:String = ""
  @Input() text:String = ""
  @Input() title:String = ""
  constructor() { }

  ngOnInit() {
  }

}