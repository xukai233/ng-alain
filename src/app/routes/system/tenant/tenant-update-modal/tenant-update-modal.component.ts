import { Component, EventEmitter, OnInit, Output, ViewChild,Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { UpdateTenantDto,TenantServiceProxy } from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tenant-update-modal',
  templateUrl: './tenant-update-modal.component.html',
  styleUrls: ['./tenant-update-modal.component.css']
})
export class TenantUpdateModalComponent implements OnInit {

  @ViewChild('updateModal') modal: NzModalRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  updateTenantForm: FormGroup;
 
  saving = false;
  tenant: UpdateTenantDto;
  tenantId:number;
  expiryTimeType = "A";

  constructor(private fb: FormBuilder,
    private tenantServiceProxy: TenantServiceProxy) {
      this.tenant = new UpdateTenantDto();
    }

  ngOnInit() {
    this.updateTenantForm = this.fb.group({
      desc : [null, []],
      displayName : [null, [Validators.required]],
      expiryTime : [null, []],
      isActive : [true, []] 
    });
  }

  show(id:number) {
    this.tenantId = id;
    this.tenantServiceProxy.get(id)
    .subscribe(re=>{
      this.tenant = re as UpdateTenantDto;
      this.expiryTimeType = this.tenant.expiryTime === 1000 ? "A":"B";
      console.log(this.tenant)
      this.modal.open();
    })
  }
  save() {
    for (const i in this.updateTenantForm.controls) {
      this.updateTenantForm.controls[i].markAsDirty();
      this.updateTenantForm.controls[i].updateValueAndValidity();
    }
    if (this.updateTenantForm.invalid) {
      return;
    }
    this.tenantServiceProxy.update(this.tenantId,this.tenant)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
        this.modal.close();
        this.updateTenantForm.reset();
        this.modalSave.emit(null);
      });
  }
  cancel() {
    this.modal.close();
    this.updateTenantForm.reset();
  }
}
