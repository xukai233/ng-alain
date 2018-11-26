import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { AccountGroupDto,AccountGroupServiceProxy} from '@serviceProxies/service-proxies';
import {UserCreateModalComponent} from './user-create-modal/user-create-modal.component'


import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
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
      "id":0,
      "displayName":"系统管理员",
      "isStatic":true,
      "default":false,
      "operate":this.operate
    },
    {
      "id":1,
      "displayName":"普通成员",
      "isStatic":true,
      "default":true,
      "operate":{
        "text":"操作",
        "menu":["重命名","删除"]
      }
    },
    {
      "id":2,
      "displayName":"计划员",
      "isStatic":false,
      "default":false,
      "operate":this.operate
    },
    {
      "id":3,
      "displayName":"操作工",
      "isStatic":false,
      "default":false,
      "operate":this.operate
    },
    {
      "id":4,
      "displayName":"车间主任",
      "isStatic":false,
      "default":false,
      "operate":this.operate
    }
  ]
  @ViewChild('createUserModal') createUserModal: UserCreateModalComponent;
  modalIsVisible = false;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private accountGroupServiceProxy:AccountGroupServiceProxy,
    ) { 
  }
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
    this.getAccountGroup();
  }

  getAccountGroup(){
    this.accountGroupServiceProxy
    .all()
    .subscribe(re=>{
      //获取用户组信息
      console.log(re)
      //this.leftMenu = re.items;
    })
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
  handleAddClick(){
    this.createUserModal.show()
  }
}
