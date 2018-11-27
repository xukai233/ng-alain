import { Component, OnInit } from '@angular/core';
import { TenantServiceProxy,FilterTenantsDto,AppServiceProxy} from '@serviceProxies/service-proxies';
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

  appDatas = [];

  treeNodes= [ {
    title   : '分类1',
    selectable:false,
    children: [ 
      {
        title   : 'CPS-DNC',
        key     : '1001',
        isLeaf : true
      }, 
      {
        title   : 'CPS-MDC',
        key     : '1002',
        isLeaf:true
      }]
    }];
  tableLoading = true;
  appLoading = true;
  selectItem:number
  appDataIndex = 1;
  editModalIsVisible = false;
  newModalIsVisible = false;
  selectTenantName = "";
  form={
    title:""
  }
  filterTenantsDto:FilterTenantsDto
  validateForm: FormGroup;
  appAuthForm:FormGroup;
  constructor(
    private fb: FormBuilder,
    private _tenantService: TenantServiceProxy,
    private _appServiceProxy:AppServiceProxy
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
    });
    this.appAuthForm = this.fb.group({
      baseControl       : [ null, [ Validators.required ] ],
      baseControlDate       : [ null, [ Validators.required ] ],
      payControl       : [ null, [ Validators.required ] ],
      payControlDate       : [ null, [ Validators.required ] ],
    });
    this.filterTenantsDto = new FilterTenantsDto()
    this.getTenants(this.filterTenantsDto);
  }

  getTenants(filterTenants: FilterTenantsDto | null | undefined): void {
    this.tableLoading = true;
    this._tenantService.list(filterTenants)
    .subscribe(result => {
      this.dataSet = result.items;
      this.selectItem = this.dataSet[0].id;
      this.selectTenantName = this.dataSet[0].name
      this.tableLoading = false;
      this.getAppList();
    });
  }

  getAppList(){
    this.appLoading = true;
    this._appServiceProxy
    .findByTenant(this.selectItem)
    .subscribe(re=>{
      this.appDatas = re.apps;
      this.appLoading = false;
    })
  }

  handleAppAuth(){
    this.newModalIsVisible = true;
  }
  handleNewCancel(){
    this.newModalIsVisible = false;
  }
  handleTrClick(data){
    this.selectItem = data.id;
    this.selectTenantName = data.name
    this.getAppList();
  }
  handleAppEdit(data){
    this.editModalIsVisible = true;
    this.form.title = data.title + "授权";
    console.log(data)
  }
  handleEditCancel(){
    this.editModalIsVisible = false;
  }
  handleEditSubmit(){

  }
  handleSearch(){
    console.log(this.filterTenantsDto)
    this.getTenants(this.filterTenantsDto);
  }
}
