import { Component, OnInit,ViewChild} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'device-edit-modal',
  templateUrl: './device-edit-modal.component.html',
  styleUrls: ['./device-edit-modal.component.css']
})
export class DeviceEditModalComponent implements OnInit {
  @ViewChild('updateModal') modal: NzModalRef;
  constructor(private fb: FormBuilder) { }
  creatForm: FormGroup;

  ngOnInit() {
  }
  show(){
    this.modal.open();
  }
  cancel(){
    this.modal.close();
  }
}
