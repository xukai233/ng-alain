import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.less']
})
export class TenantComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'租户'},
  ]
  isCollapse = true;
  modalIsVisible = false;
  dataSet = [
    {
      key    : '1',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '2',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    }
  ];
  validateForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  rangePickerStyle = {
    "width":"100%"
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      TenantCode       : [ null, [ Validators.required ] ],
      TenantName       : [ null, [ Validators.required ] ],
      email            : [ null, [ Validators.email,Validators.required ] ],
      randomCode       : [ true ],
      password         : [ null, [ Validators.required ] ],
      passwordCheck         : [ null, [ Validators.required ] ],
      needPassword      : [ true ],
      enable          : [ true ],
      subDate          : [ 'A'],
      
    });
  }
  toggleCollapse(){
    this.isCollapse = !this.isCollapse
  }
  handleTenantAdd(){
    this.modalIsVisible = true;
  }

  handleCancel(): void {
    this.modalIsVisible = false;
  }
  submitTenantAddForm(): void {
    //this.modalIsVisible = false;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }
}
