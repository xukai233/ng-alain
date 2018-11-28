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
  userGroupId = 0
  leftMenu = [
  ]
  @ViewChild('createUserModal') createUserModal: UserCreateModalComponent;
  modalIsVisible = false;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private accountGroupServiceProxy:AccountGroupServiceProxy,
    private routerIonfo:ActivatedRoute,
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
    .list()
    .subscribe(re=>{
      this.leftMenu = re.items;
      this.router.navigate([`/system/user/account`,this.leftMenu[0].id]);
      this.userGroupId = this.leftMenu[0].id;
    })
  }

  handleLeftSelect(val){
    this.router.navigate([`/system/user/account`,val.id]);
    this.userGroupId = val.id;
  }
  handleOperateClick(val){
    console.log(val)
  }
  handleTabSelect(val){
    switch (val) {
      case "平台账号":
        this.router.navigate(['/system/user/account',this.userGroupId])
        break;
      case "权限":
        this.router.navigate(['/system/user/permission',this.userGroupId])
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
