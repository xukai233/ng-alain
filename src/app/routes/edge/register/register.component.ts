import { Component, OnInit,ViewChild } from '@angular/core';
import { RegisterCreateModalComponent } from './register-create-modal/register-create-modal.component'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  @ViewChild('createRegisterModal') createProductModal: RegisterCreateModalComponent;

  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'边缘管理'},
    {title:'登记注册'},
  ]
  tabs = ["终端","网关","Hub"];
  selectTab = "终端";
  radioValue = "all"
  constructor() { }

  ngOnInit() {
  }

  handleTabSelect(value){

  }

  handleAddClick(){
    this.createProductModal.show();
  }

}
