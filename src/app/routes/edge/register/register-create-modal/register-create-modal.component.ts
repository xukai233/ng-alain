import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'register-create-modal',
  templateUrl: './register-create-modal.component.html',
  styleUrls: ['./register-create-modal.component.css']
})
export class RegisterCreateModalComponent implements OnInit {

  @ViewChild('createModal') modal: NzModalRef;
  constructor(private fb: FormBuilder) { }
  creatForm: FormGroup;
  
  ngOnInit() {
    this.creatForm = this.fb.group({
      name : [null, [Validators.required]],
      version : [null, [Validators.required]],
      group : [null,[]]
    });
  }

  show(){
    this.modal.open();
  }
  cancel(){
    this.modal.close();
  }

}
