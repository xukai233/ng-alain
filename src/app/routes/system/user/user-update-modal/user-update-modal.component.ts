import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AccountListDto,AccountServiceProxy,UpdateAccountDto} from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.css']
})
export class UserUpdateModalComponent implements OnInit {
  @ViewChild('updateModal') modal: NzModalRef;
  validateForm:FormGroup;
  account:UpdateAccountDto;
  constructor(
    private fb: FormBuilder,
    private _accountService:AccountServiceProxy
    ) { 

    this.validateForm = this.fb.group({
      userName:[ null, [ Validators.required ] ],
      email : [ null, [ Validators.email,Validators.required ] ],
      active : [ true ],
      accountGourps:[],
    });
    this.account = new UpdateAccountDto();
  }

  ngOnInit() {
  }

  show(data:AccountListDto):void {
    this.modal.open();
  }
  handleCancel(): void {
    this.modal.close();
    this.validateForm.reset();
  }

}
