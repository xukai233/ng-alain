import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'账号管理'},
  ]
  operate = {
    "text":"操作",
    "menu":["重命名","删除","设为默认"]
  }
  tabs = ["平台账号","权限"]
  leftMenu = [
    {
      "key":0,
      "title":"系统管理员",
      "subtitle":"系统分组",
      "default":false,
      "operate":this.operate
    },
    {
      "key":1,
      "title":"普通成员",
      "subtitle":"系统分组",
      "default":true,
      "operate":{
        "text":"操作",
        "menu":["重命名","删除"]
      }
    },
    {
      "key":2,
      "title":"计划员",
      "subtitle":"自定义分组",
      "default":false,
      "operate":this.operate
    },
    {
      "key":3,
      "title":"操作工",
      "subtitle":"自定义分组",
      "default":false,
      "operate":this.operate
    },
    {
      "key":4,
      "title":"车间主任",
      "subtitle":"自定义分组",
      "default":false,
      "operate":this.operate
    }
  ]

  dataSet = [
    {
      key    : '1',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '2',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  handleLeftSelect(val){
    console.log(val);
  }
  handleOperateClick(val){
    console.log(val)
  }
  handleTabSelect(val){
    console.log(val)
  }

}
