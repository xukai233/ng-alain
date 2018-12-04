import { Component, OnInit } from '@angular/core';
import { TenantServiceProxy,FilterTenantsDto,ListResultDtoOfAppDto,AppServiceProxy} from '@serviceProxies/service-proxies';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.less']
})
export class AppListComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'APP管理'},
  ]
  totalCount= 20;
  isLoading = false;
  dataSet:ListResultDtoOfAppDto;
  constructor(
    private appServiceProxy:AppServiceProxy
    ) { 
    this.dataSet = new ListResultDtoOfAppDto();
  }

  ngOnInit() {
    this.listApp()
  }
  listApp(){
    this.isLoading = true;
    this.appServiceProxy
    .listAll()
    .subscribe(re=>{
      this.isLoading = false;
      this.dataSet = re;
      console.log(re);
    })
  }

}
