import { Component, EventEmitter, OnInit, Output, ViewChild,Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { UpdateTenantDto } from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {TenantService} from '../tenant.service'
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
  expiryTime:any;
  constructor(private fb: FormBuilder,
    private tenantService: TenantService) {
      this.tenant = new UpdateTenantDto();
    }

  ngOnInit() {
    this.updateTenantForm = this.fb.group({
      desc : [null, []],
      displayName : [null, [Validators.required]],
      expiryTime : [null, []],
      isActive : [true, []],
      expiryTimeType:[]
    });
  }

  show(id:number) {
    this.tenantId = id;
    this.tenantService.get(id)
    .subscribe(re=>{
      this.tenant = re as UpdateTenantDto;
      this.expiryTimeType = this.tenant.expiryTime === 1000 ? "A":"B";
      this.expiryTime = new Date(this.tenant.expiryTime);
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
    let tenant = new UpdateTenantDto();
    tenant.displayName = this.tenant.displayName;
    tenant.expiryTime = this.expiryTimeType == "A"?1000:new Date(this.expiryTime).getTime();
    tenant.desc = this.tenant.desc;
    tenant.isActive = this.tenant.isActive;
    this.saving = true;
    this.tenantService.update(this.tenantId,tenant)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
        this.modal.close();
        this.updateTenantForm.reset();
      });
  }
  cancel() {
    this.modal.close();
    this.updateTenantForm.reset();
  }

  handleTimeChange(){
    this.expiryTime = "";
  }
}
