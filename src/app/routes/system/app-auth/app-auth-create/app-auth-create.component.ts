import { Component, OnInit, ViewChild,Output,EventEmitter} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AppServiceProxy,AuthorizeTenantDto,AppDto} from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-auth-create',
  templateUrl: './app-auth-create.component.html',
  styleUrls: ['./app-auth-create.component.less']
})
export class AppAuthCreateComponent implements OnInit {
  @ViewChild('createModal') modal: NzModalRef;
  loading = false;
  appAuthForm:FormGroup;
  appForm:AppDto;
  selectApp:number;
  apps = [];
  tenantId:number;

  baseControlDate = "";
  payControlDate = "";
  payDate:any;
  baseDate:any;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private _appServiceProxy:AppServiceProxy,
  ) {
    this.appAuthForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
      payExpiryTime:[],
      baseExpiryTime:[]
    });
  }

  ngOnInit() {
    this.appForm = new AppDto();
    this.listApp();
  }

  show(tenantId:number){
    this.tenantId = tenantId;
    this.modal.open();
  }

  listApp(){
    this._appServiceProxy
    .listAllBrief()
    .subscribe(re=>{
      this.apps = re.items;
      this.handleAppChange(this.apps[0])
    })
  }

  handleAppChange(app){
    this.selectApp = app.value;
  }

  handleSubmit(){
    const authorizeTenantDto = new AuthorizeTenantDto();
    authorizeTenantDto.tenantId = this.tenantId;
    authorizeTenantDto.appId = this.selectApp;
    authorizeTenantDto.basic = this.appForm.basic;
    authorizeTenantDto.pay = this.appForm.pay;
    authorizeTenantDto.basicExpiryTime = this.baseControlDate == "A"?1000:new Date(this.baseDate).getTime();
    authorizeTenantDto.payExpiryTime = this.payControlDate == "A"?1000:new Date(this.payDate).getTime();
    this.loading = true;
    this._appServiceProxy
    .addAuthorize(authorizeTenantDto)
    .subscribe(re=>{
      this.loading =false;
      this.modal.close();
      this.modalSave.emit(null);
    })
  }

  handleCancel(){
    this.modal.close();
  }


}
