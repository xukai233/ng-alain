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
  selector: 'app-auth-update',
  templateUrl: './app-auth-update.component.html',
  styleUrls: ['./app-auth-update.component.css']
})
export class AppAuthUpdateComponent implements OnInit {
  @ViewChild('updateModal') modal: NzModalRef;
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { 
    this.validateForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
    });
  }

  ngOnInit() {
  }
  handleCancel(){
    this.modal.close();
  }
  show(){
    this.modal.open();
  }

}
