import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';

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
  selectTab = "平台账号"
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


  constructor(
    private router:Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if("/system/user/account" === this.router.url){
        this.selectTab = "平台账号"
      }
      if("/system/user/permission" === this.router.url){
        this.selectTab = "权限"
      }
    });
  }

  handleLeftSelect(val){
    console.log(val);
  }
  handleOperateClick(val){
    console.log(val)
  }
  handleTabSelect(val){
    switch (val) {
      case "平台账号":
        this.router.navigate(['/system/user/account'])
        break;
      case "权限":
        this.router.navigate(['/system/user/permission'])
        break;
      default:
        // code...
        break;
    }
  }

}
