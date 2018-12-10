import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { CreateTenantDto } from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { TenantService } from '../tenant.service'

@Component({
  selector: 'app-tenant-create-modal',
  templateUrl: './tenant-create-modal.component.html',
  styleUrls: ['./tenant-create-modal.component.css']
})
export class CreateTenantModalComponent implements OnInit {

  @ViewChild('createModal') modal: NzModalRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  createTenantForm: FormGroup;
 
  loading = false;
  tenant: CreateTenantDto;
  setRandomPassword =false;
  baseControlType = ''

  constructor(private fb: FormBuilder,
    private tenantService:TenantService
  ) {
      this.tenant = new CreateTenantDto();
     }

  ngOnInit() {
    this.createTenantForm = this.fb.group({
      tenantCode : [null, [Validators.required]],
      tenantName : [null, [Validators.required]],
      tenantDesc : [null, []],
      adminEmail : [null, [Validators.email,Validators.required]],
      adminPassword : [null, [Validators.required]],
      passwordCheck : [null, [Validators.required,this.confirmationValidator]],
      setRandomPassword : [null],
      expiryTime : [null, []],
      shouldChangePasswordOnNextLogin : [null, []],
      isActive : [null, []],
      baseControlType:[]
    });
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.createTenantForm.controls.adminPassword.value) {
      return { confirm: true, error: true };
    }
  };

  show() {
    this.init();
    this.modal.open();
  }
  save() {
    for (const i in this.createTenantForm.controls) {
      this.createTenantForm.controls[i].markAsDirty();
      this.createTenantForm.controls[i].updateValueAndValidity();
    }
    if (this.createTenantForm.invalid) {
      return;
    }
    this.tenant.expiryTime = this.baseControlType == "A"?1000:new Date(this.tenant.expiryTime).getTime();
    this.loading = true;
    this.tenantService
    .create(this.tenant)
    .subscribe(()=>{
      this.loading = false;
      this.modal.close();
      this.createTenantForm.reset();
    })
  }

  cancel() {
    this.modal.close();
    this.createTenantForm.reset();
  }

  init(): void {
    this.tenant = new CreateTenantDto();
    this.setRandomPassword = false;
    this.tenant.isActive = true;
    this.tenant.shouldChangePasswordOnNextLogin = true;
  }

  onShown(): void {
    document.getElementById('tenantCode').focus();
  }

  handleRandomPassword(): void {
    this.setRandomPassword = this.createTenantForm.controls.setRandomPassword.value;
  }
}
