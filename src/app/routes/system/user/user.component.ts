import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { AccountGroupDto,AccountGroupServiceProxy} from '@serviceProxies/service-proxies';

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

  modalIsVisible = false;
  validateForm:FormGroup;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountGroupServiceProxy:AccountGroupServiceProxy,
    ) { 

    this.validateForm = this.fb.group({
      userCode:[ null, [ Validators.required ] ],
      userName:[ null, [ Validators.required ] ],
      email : [ null, [ Validators.email,Validators.required ] ],
      password:[ null, [ Validators.required ] ],
      checkPassword:[ null, [ Validators.required,this.confirmationValidator ] ],
      avatar:[ null, [ Validators.required ] ],
      needPassword : [ true ],
      active : [ true ],
    });
  }
  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };
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

  getAccountGroup(){
    this.accountGroupServiceProxy
    .all()
    .subscribe(re=>{
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
    this.modalIsVisible = true;
  }
  handleCancel(){
    this.modalIsVisible = false;
  }
}
