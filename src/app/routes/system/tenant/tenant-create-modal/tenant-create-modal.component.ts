import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { CreateTenantInputDto, TenantsServiceProxy } from '@serviceProxies/service-proxies';
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
  tenant: CreateTenantInputDto;

  constructor(private fb: FormBuilder,
    private _tenantService: TenantsServiceProxy) {
      this.tenant = new CreateTenantInputDto();
     }

  ngOnInit() {

    this.createTenantForm = this.fb.group({
      tenantCode : [null, []],
      tenantName : [null, []],
      tenantDesc : [null, []],
      adminEmail : [null, []],
      adminPassword : [null, []],
      passwordCheck : [null, []],
      setRandomPassword : [null, []],
      expiryTime : [null, []],
      shouldChangePasswordOnNextLogin : [true, []],
      isActive : [true, []] 
    });
  }

  show() {
    this.init();
    this.modal.open();
  }
  save() {

    console.dir(this.tenant);

    this._tenantService.new(this.tenant)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
        this.modal.close();
        this.modalSave.emit(null);
      });
  }

  cancel() {
    this.modal.close();
  }

  init(): void {
    this.tenant = new CreateTenantInputDto();
  }

  onShown(): void {
    document.getElementById('tenantCode').focus();
  }
}