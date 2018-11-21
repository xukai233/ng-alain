import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { TenantsServiceProxy } from '@serviceProxies/service-proxies';
import { CreateTenantModalComponent } from './tenant-create-modal/tenant-create-modal.component';


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

  constructor(
    private _tenantService: TenantsServiceProxy) {
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
}
