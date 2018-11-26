import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.less']
})
export class AppListComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'APP管理'},
  ]
  totalCount= 20;
  isLoading = true;
  dataSet = [
    {
      "id": 0,
      "displayName": "string",
      "appKey": "string",
      "status": "InUse",
      "basic": true,
      "basicExpiryTime": 0,
      "pay": true,
      "payExpiryTime": 0
    }
  ]
  constructor() { }

  ngOnInit() {
    this.isLoading = false;
  }

}
