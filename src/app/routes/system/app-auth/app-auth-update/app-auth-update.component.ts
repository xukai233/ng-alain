import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AppServiceProxy,AppDto,AuthorizeTenantDto} from '@serviceProxies/service-proxies';
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
  baseControlDate = "";
  payControlDate = "";
  payDate:any;
  baseDate:any;
  tenantID = 0;
  loading= false;


  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private _appServiceProxy:AppServiceProxy
  ) { 
    this.validateForm = this.fb.group({
      baseControl       : [ null],
      baseControlDate       : [ null],
      payControl       : [ null],
      payControlDate       : [ null],
      payExpiryTime:[],
      baseExpiryTime:[]
    });
    this.appForm = new AppDto();
  }

  ngOnInit() {
  }
  handleCancel(){
    this.clearForm();
    this.modal.close();
  }
  handleSubmit(){
    const authorizeTenantDto = new AuthorizeTenantDto();
    authorizeTenantDto.appId = this.appForm.id;
    authorizeTenantDto.tenantId = this.tenantID;
    authorizeTenantDto.basic = this.appForm.basic;
    authorizeTenantDto.pay = this.appForm.pay;
    authorizeTenantDto.basicExpiryTime = this.baseControlDate == "A"?1000:new Date(this.baseDate).getTime();
    authorizeTenantDto.payExpiryTime = this.payControlDate == "A"?1000:new Date(this.payDate).getTime();
    this.loading = true;
    this._appServiceProxy
    .updateAuthorize(authorizeTenantDto)
    .subscribe(re=>{
      this.loading = false;
      this.modalSave.emit(null);
      this.modal.close();
    })
  }
  show(data:AppDto,tenantID:number){
    this.clearForm();
    this.tenantID = tenantID;
    this.appForm = data;
    if(data.basic){
      this.baseControlDate = data.basicExpiryTime === 1000 ? "A":"B";
      this.baseDate = data.basicExpiryTime === 1000?"":new Date(data.basicExpiryTime);
    }
    if(data.pay){
      this.payControlDate = data.payExpiryTime === 1000 ? "A":"B";
      this.payDate = data.payExpiryTime === 1000 ?"":new Date(data.payExpiryTime);
    }
    this.modal.open();
  }

  ngAfterViewInit(){
  }

  handleBaseApply(){
    if(!this.appForm.basic){
      this.baseControlDate = "";
    }else{
      this.baseControlDate = "A";
    }
    this.baseDate = "";
  }

  handlePayApply(){
    if(!this.appForm.pay){
      this.payControlDate = "";
    }else{
      this.payControlDate = "A";
    }
    this.payDate = "";
  }

  handlePayChange(){
    this.payDate = "";
    this.appForm.pay = true;
  }

  handleBaseChange(){
    this.baseDate = "";
  }

  clearForm(){
    this.appForm = new AppDto();
    this.baseControlDate = "";
    this.payControlDate = "";
    this.payDate="";
    this.baseDate="";
  }
}
