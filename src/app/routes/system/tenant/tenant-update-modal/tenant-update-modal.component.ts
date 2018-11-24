import { Component, EventEmitter, OnInit, Output, ViewChild,Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { UpdateTenantDto, ServiceProxy } from '@serviceProxies/service-proxies';
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

  createTenantForm: FormGroup;
 
  saving = false;
  tenant: UpdateTenantDto;

  constructor(private fb: FormBuilder,
    private _Service: ServiceProxy) {
      this.tenant = new UpdateTenantDto();
    }

  ngOnInit() {
    this.createTenantForm = this.fb.group({
      tenantCode : [null, []],
      tenantName : [null, []],
      expiryTime : [null, []],
      isActive : [true, []] 
    });
  }

  show(id:number) {
    this._Service.tenantGet(id)
    .subscribe(re=>{
      this.tenant = re as UpdateTenantDto;
      this.modal.open();
    })
  }
  save() {
    this._Service.tenantPut(0,this.tenant)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
        this.modal.close();
        this.modalSave.emit(null);
      });
  }
  cancel() {
    this.modal.close();
  }
}
