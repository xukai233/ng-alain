import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './app-auth.component.html',
  styleUrls: ['./app-auth.component.less']
})
export class AppAuthComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'APP授权'},
  ]

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
      code   : 'A002',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A003',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A004',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A005',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A006',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A007',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A008',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A009',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A0010',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A0011',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A0012',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A0013',
      name   : '一汽解放汽车有限公司无锡柴油机厂',
      endTime:'2020年1月1日 09:00',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    }
  ];

  appDatas = [
    {
      title:"CPS-MDC",
      type:"定制版",
      key:"a1AB7T4bFlg",
      status:"使用中",
      base:"2018-11-6 ~ 2019-11-5",
      pay:"2018-11-6 ~ 2019-11-5"
    },
    {
      title:"CPS-MDC1",
      type:"标准版",
      key:"a1AB7T4bFlg1",
      status:"已逾期",
      base:"2018-11-6 ~ 2019-11-5",
      pay:"未授权"
    },
    {
      title:"CPS-MDC2",
      type:"标准版",
      key:"a1AB7T4bFlg2",
      status:"使用中",
      base:"2018-11-6 ~ 2019-11-5",
      pay:"未授权"
    }
  ]
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

  selectItem= ""
  appDataIndex = 1;
  editModalIsVisible = false;
  newModalIsVisible = false;
  form={
    title:""
  }
  validateForm: FormGroup;
  appAuthForm:FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
    });
    this.appAuthForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
    });
    this.selectItem = this.dataSet[0].code;
  }
  handleAppAuth(){
    this.newModalIsVisible = true;
  }
  handleNewCancel(){
    this.newModalIsVisible = false;
  }
  handleTrClick(data){
    this.selectItem = data.code;
  }
  handleAppEdit(data){
    this.editModalIsVisible = true;
    this.form.title = data.title + "授权";
    console.log(data)
  }
  handleEditCancel(){
    this.editModalIsVisible = false;
  }
  handleEditSubmit(){

  }
}
