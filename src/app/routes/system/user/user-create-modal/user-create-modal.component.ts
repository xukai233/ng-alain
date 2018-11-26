import { Component, OnInit, Output, ViewChild} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.css']
})
export class UserCreateModalComponent implements OnInit {
  @ViewChild('createModal') modal: NzModalRef;
  validateForm:FormGroup;
  constructor(
    private fb: FormBuilder
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

  }
  show() {
    this.modal.open();
  }

  handleCancel() {
    this.modal.close();
  }
}
