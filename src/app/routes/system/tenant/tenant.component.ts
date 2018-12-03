import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { FilterTenantsDto,TenantListDto,UpdateTenantDto} from '@serviceProxies/service-proxies';
import { CreateTenantModalComponent } from './tenant-create-modal/tenant-create-modal.component';
import { TenantUpdateModalComponent } from './tenant-update-modal/tenant-update-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { TenantService } from './tenant.service' 


@Component({
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.less']
})

export class TenantComponent implements OnInit {

  @ViewChild('createTenantModal') createTenantModal: CreateTenantModalComponent;
  @ViewChild('updateTenantModal') updateTenantModal: TenantUpdateModalComponent;

  dataSet$: Observable<TenantListDto>;
  loading$: Observable<boolean>;

  totalCount = 0;

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
  filterTenants:FilterTenantsDto;
  constructor(
    private tenantService:TenantService,
    private modalService:NzModalService) {
    this.filterTenants = new FilterTenantsDto();
  }

  ngOnInit() {
    this.filterTenants.pageSize = 10;
    this.filterTenants.pageIndex = 1;

    this.dataSet$ = this.tenantService.data$;
    this.loading$ = this.tenantService.loading$;
    this.tenantService.list(this.filterTenants)
  }


  handlePageSizeChange(num:number){
    this.filterTenants.pageIndex = 1;
    this.filterTenants.pageSize = num;
    this.tenantService.list(this.filterTenants)
  }

  handleIndexChange(num:number){
    this.filterTenants.pageIndex = num;
  }

  createTenant(): void {
    this.createTenantModal.show();
  }
  handleUpdateTenant(id:number): void {
    this.updateTenantModal.show(id);
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
  handleSearch(){
    this.tenantService.list(this.filterTenants)
  }
  handelTenantStop(tenant:TenantListDto){
    this.tenantService.stop(tenant);
  }
}
