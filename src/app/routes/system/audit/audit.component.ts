import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.less']
})
export class AuditComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'审计日志'},
  ]
  rangePickerStyle = {
    "width":"100%"
  }
  isCollapse = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse(){
    this.isCollapse = !this.isCollapse
  }

}
