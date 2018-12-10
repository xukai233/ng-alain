import { Component, OnInit,ViewChild} from '@angular/core';
import { TenantServiceProxy,FilterTenantsDto,AppDto,AppServiceProxy} from '@serviceProxies/service-proxies';
import {AppAuthCreateComponent} from './app-auth-create/app-auth-create.component'
import {AppAuthUpdateComponent} from './app-auth-update/app-auth-update.component'
import { Observable, Subject, from, forkJoin } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './app-auth.component.html',
  styleUrls: ['./app-auth.component.less']
})
export class AppAuthComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'APP授权'},
  ]

  dataSet = [];
  tenantCount = 0;

  appDatas = [];


  tableLoading = true;
  appLoading = true;
  selectItem:number
  appDataIndex = 1;
  selectTenantName = "";
  form={
    title:""
  }
  filterTenantsDto:FilterTenantsDto
  @ViewChild('createAppAuth') createAppAuth: AppAuthCreateComponent;
  @ViewChild('updateAppAuth') updateAppAuth: AppAuthUpdateComponent;
  constructor(
    private fb: FormBuilder,
    private _tenantService: TenantServiceProxy,
    private _appServiceProxy:AppServiceProxy
  ) { }

  ngOnInit() {
    this.filterTenantsDto = new FilterTenantsDto()
    this.filterTenantsDto.pageIndex = 1;
    this.filterTenantsDto.pageSize = 10;
    this.getTenants(this.filterTenantsDto);
  }

  getTenants(filterTenants: FilterTenantsDto | null | undefined): void {
    this.tableLoading = true;
    this._tenantService
    .list(filterTenants)
    .subscribe(result => {
      this.dataSet = result.items;
      this.tenantCount = result.totalCount;
      this.selectItem = this.dataSet[0].id;
      this.selectTenantName = this.dataSet[0].name
      this.tableLoading = false;
      this.getAppList(this.selectItem);
    });
  }

  /**
   * 列出特定租户下的所有App
   * @param tenantId 需要获得App的租户Id
   */
  getAppList(tenantID:number){
    this.appLoading = true;
    this._appServiceProxy
    .findByTenant(tenantID)
    .subscribe(re=>{
      this.appDatas = re.apps;
      this.appLoading = false;
    })
  }

  handleAppAuth(){
    this.createAppAuth.show(this.selectItem);
  }
  handleTrClick(data){
    this.selectItem = data.id;
    this.selectTenantName = data.name
    this.getAppList(this.selectItem);
  }

  handleEditSubmit(){

  }
  handleAppEdit(data:AppDto){
    this.updateAppAuth.show(data,this.selectItem);
  }

  handleSearch(){
    this.filterTenantsDto.pageIndex = 1;
    this.getTenants(this.filterTenantsDto);
  }
  handleUpdateSave(){
    this.getAppList(this.selectItem);
  }
  handleSearchChange(){
    
  }
  handlePageSizeChange(num){
    this.filterTenantsDto.pageIndex = 1;
    this.filterTenantsDto.pageSize = num;
    this.getTenants(this.filterTenantsDto);
  }

  handleIndexChange(num){
    this.filterTenantsDto.pageIndex = num;
    this.getTenants(this.filterTenantsDto);
  }
}
