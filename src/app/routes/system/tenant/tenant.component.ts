import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { TenantsServiceProxy } from '@serviceProxies/service-proxies';
import { CreateTenantModalComponent } from './tenant-create-modal/tenant-create-modal.component';
import { NzModalService } from 'ng-zorro-antd';


@Component({
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.less']
})

export class TenantComponent implements OnInit {

  @ViewChild('createTenantModal') createTenantModal: CreateTenantModalComponent;

  dataSet = [];

  filters: {
    filterText: string;
    tenantCode: string;
    tenantName: string;
  } = <any>{};

  isCollapse = true;
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'租户'},
  ]
  constructor(
    private _tenantService: TenantsServiceProxy,private modalService:NzModalService) {
  }

  ngOnInit() {

    this.getTenants();
  }

  getTenants(): void {
    this._tenantService.list(
      this.filters.filterText,
      this.filters.tenantCode,
      this.filters.tenantName,
      null,
      null,
      null,
      1,
      10
    ).subscribe(result => {
      this.dataSet = result.items;
    });
  }

  createTenant(): void {
    this.createTenantModal.show();
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
  handleDelete() : void {
    this.modalService.confirm({
      nzTitle  : '<i>回收租户</i>',
      nzContent: '<b>该操作将清空该租户及所有内容，此操作不可逆，确认回收?</b>',
      nzOkText:'回收',
      nzOkType:'danger',
      nzOnOk   : () => console.log('OK')
    });
  }
}
