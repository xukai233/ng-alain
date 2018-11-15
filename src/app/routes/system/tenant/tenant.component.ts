import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.less']
})
export class TenantComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'租户'},
  ]
  isCollapse = true;
  constructor() { }
  rangePickerStyle = {
    "width":"100%"
  }

  ngOnInit() {
  }
  toggleCollapse(){
    this.isCollapse = !this.isCollapse
  }
}
