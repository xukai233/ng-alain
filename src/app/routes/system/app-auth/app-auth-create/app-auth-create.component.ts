import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AppServiceProxy} from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-auth-create',
  templateUrl: './app-auth-create.component.html',
  styleUrls: ['./app-auth-create.component.css']
})
export class AppAuthCreateComponent implements OnInit {
  @ViewChild('createModal') modal: NzModalRef;
  appAuthForm:FormGroup;

  treeNodes= [ {
    title   : '分类1',
    selectable:false,
    children: [ 
      {
        title   : 'CPS-DNC',
        key     : '1001',
        isLeaf : true
      }, 
      {
        title   : 'CPS-MDC',
        key     : '1002',
        isLeaf:true
      }]
    }];

  constructor(
    private fb: FormBuilder,
  ) {
    this.appAuthForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
    });
  }

  ngOnInit() {
  }

  show(){
    this.modal.open();
  }

  handleSubmit(){

  }

  handleCancel(){
    this.modal.close();
  }

}
