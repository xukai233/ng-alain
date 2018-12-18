import { Component,OnInit} from '@angular/core';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class DashboardHomeComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'dashboard'}
  ]
  clientSourceData=[
    { item: '正常租户', count: 33 },
    { item: '禁用租户', count: 11 }
  ];
  appSourceDate = [
    { item: '已上架', count: 33 },
    { item: '已下架', count: 12 }
  ]
  userSourceDate = [
    { item: '正常用户', count: 33 },
    { item: '禁用用户', count: 12 }
  ]
  deviceSourceDate = [
    { item: '在线设备', count: 1065 },
    { item: '离线设备', count: 419 },
    { item: '未激活', count: 200 }
  ]
  constructor() { }

  ngOnInit() {
  }

}
