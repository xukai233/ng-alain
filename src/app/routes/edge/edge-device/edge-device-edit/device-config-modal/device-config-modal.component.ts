import { Component, OnInit,ViewChild} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'device-config-modal',
  templateUrl: './device-config-modal.component.html',
  styleUrls: ['./device-config-modal.component.css']
})
export class DeviceConfigModalComponent implements OnInit {
  @ViewChild('configModal') modal: NzModalRef;
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
