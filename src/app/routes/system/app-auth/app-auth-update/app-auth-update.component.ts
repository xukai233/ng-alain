import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AppServiceProxy,AppDto} from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-auth-update',
  templateUrl: './app-auth-update.component.html',
  styleUrls: ['./app-auth-update.component.css']
})
export class AppAuthUpdateComponent implements OnInit {
  @ViewChild('updateModal') modal: NzModalRef;
  validateForm: FormGroup;
  appForm:AppDto;
  constructor(
    private fb: FormBuilder,
  ) { 
    this.validateForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
    });
    this.appForm = new AppDto();
  }

  ngOnInit() {
  }
  handleCancel(){
    this.modal.close();
  }
  show(data:AppDto){
    this.appForm = data;
    console.log(data);
    this.modal.open();
  }

}
