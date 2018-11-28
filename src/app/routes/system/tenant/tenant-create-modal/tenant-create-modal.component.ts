import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { CreateTenantDto, TenantServiceProxy } from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tenant-create-modal',
  templateUrl: './tenant-create-modal.component.html',
  styleUrls: ['./tenant-create-modal.component.css']
})
export class CreateTenantModalComponent implements OnInit {

  @ViewChild('createModal') modal: NzModalRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  createTenantForm: FormGroup;
 
  saving = false;
  tenant: CreateTenantDto;
  setRandomPassword =false;

  constructor(private fb: FormBuilder,
    private _tenantService: TenantServiceProxy) {
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
      setRandomPassword : [null, [Validators.required]],
      expiryTime : [null, []],
      shouldChangePasswordOnNextLogin : [null, []],
      isActive : [null, []] 
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
    this._tenantService.add(this.tenant)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
        this.modal.close();
        this.createTenantForm.reset();
        this.modalSave.emit(null);
      });
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
