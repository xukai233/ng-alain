import { Component, OnInit,ViewChild} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'product-create-modal',
  templateUrl: './product-create-modal.component.html',
  styleUrls: ['./product-create-modal.component.css']
})
export class ProductCreateModalComponent implements OnInit {
  @ViewChild('createModal') modal: NzModalRef;
  constructor(private fb: FormBuilder) { }
  creatForm: FormGroup;

  ngOnInit() {
    this.creatForm = this.fb.group({
      name : [null, [Validators.required]]
    });
  }

  show(){
    this.modal.open();
  }
  cancel(){
    this.modal.close();
  }

}
