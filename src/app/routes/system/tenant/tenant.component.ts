import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { FilterTenantsDto,TenantListDto,UpdateTenantDto,AppServiceProxy} from '@serviceProxies/service-proxies';
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
  dateRage=[];

  totalCount = 0;
  apps = [];
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
    private tenantService:TenantService,
    private modalService:NzModalService,
    private _appServiceProxy:AppServiceProxy) {
    this.tenantService.filterTenants = new FilterTenantsDto();
  }

  ngOnInit() {
    this.tenantService.filterTenants.pageSize = 10;
    this.tenantService.filterTenants.pageIndex = 1;

    this.dataSet$ = this.tenantService.data$;
    this.loading$ = this.tenantService.loading$;
    this.tenantService.list(this.tenantService.filterTenants)
    this.listApp();
  }

  listApp(){
    this._appServiceProxy
    .listAllBrief()
    .subscribe(re=>{
      this.apps = re.items;
    })
  }


  handlePageSizeChange(num:number){
    this.tenantService.filterTenants.pageSize = num;
    this.tenantService.filterTenants.pageIndex = 1;
    this.tenantService.list(this.tenantService.filterTenants)
  }

  handleIndexChange(num:number){
    this.tenantService.filterTenants.pageIndex = num;
    this.tenantService.list(this.tenantService.filterTenants)
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
    if(this.dateRage){
      this.tenantService.filterTenants.createDateEnd = Date.parse(this.dateRage[1])
      this.tenantService.filterTenants.createDateStart = Date.parse(this.dateRage[0])
    }
    this.tenantService.filterTenants.pageIndex = 1;
    this.tenantService.list(this.tenantService.filterTenants)
  }
  handelTenantStop(tenant:TenantListDto){
    this.tenantService.stop(tenant);
  }
}
