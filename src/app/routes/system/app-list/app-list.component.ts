import { Component, OnInit } from '@angular/core';
import { TenantServiceProxy,FilterTenantsDto,ListResultDtoOfAppDto,AppServiceProxy,AppDto,AppStage,PageSearchDto} from '@serviceProxies/service-proxies';

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
  totalCount= 0;
  isLoading = false;
  dataSet:ListResultDtoOfAppDto;
  pageSearchDto:PageSearchDto;
  constructor(
    private appServiceProxy:AppServiceProxy
    ) { 
    this.dataSet = new ListResultDtoOfAppDto();
  }

  ngOnInit() {
    this.pageSearchDto = new PageSearchDto();
    this.pageSearchDto.pageIndex = 1;
    this.pageSearchDto.pageSize = 10;
    this.listApp()
  }
  listApp(){
    this.isLoading = true;
    this.appServiceProxy
    .listAll(this.pageSearchDto)
    .subscribe(re=>{
      this.isLoading = false;
      this.dataSet = re;
      console.log(re);
    })
  }
  handUpApp(data:AppDto){
    this.appServiceProxy
    .setStage(data.id,AppStage.ForSale)
    .subscribe(re=>{
      this.listApp();
    })
  }

  handDownApp(data:AppDto){
    this.appServiceProxy
    .setStage(data.id,AppStage.Preparatory)
    .subscribe(re=>{
      this.listApp();
    })
  }

  //分页功能后端还没有实现
  handlePageSizeChange(num){
    this.pageSearchDto.pageSize = num;
    this.pageSearchDto.pageIndex = 1;
    this.listApp();
  }

  handleIndexChange(num){
    this.pageSearchDto.pageIndex = num;
    this.listApp();
  }

  //当app的图片加载失败是，则显示默认图
  handleImageErr(data){
    data.imageUrl = "http://dada-image-bed.oss-cn-shenzhen.aliyuncs.com/18-12-7/45674085.jpg"
  }

}
