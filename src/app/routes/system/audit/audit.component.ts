import { Component, OnInit } from '@angular/core';
import { FilterAuditLogsDto,AuditLogsListDto,AuditLogServiceProxy} from '@serviceProxies/service-proxies';

@Component({
  selector: 'audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.less']
})
export class AuditComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'审计日志'},
  ]
  rangePickerStyle = {
    "width":"100%"
  }
  isCollapse = true;
  dataSet:AuditLogsListDto[];
  totalCount = 0;
  tableLoading = false;
  filterAuditLogsDto:FilterAuditLogsDto;
  constructor(
    private auditLogServiceProxy:AuditLogServiceProxy
    ){ 
    this.filterAuditLogsDto = new FilterAuditLogsDto();
    this.filterAuditLogsDto.pageIndex = 1;
    this.filterAuditLogsDto.pageSize = 10;
  }

  ngOnInit() {
    this.getAudits();
  }
  getAudits(){
    this.tableLoading = true;
    this.auditLogServiceProxy
    .list(this.filterAuditLogsDto)
    .subscribe(re=>{
      this.dataSet = re.items;
      this.totalCount = re.totalCount;
      this.tableLoading = false;
    })
  }

  toggleCollapse(){
    this.isCollapse = !this.isCollapse
  }

  handlePageSizeChange(num){
    this.filterAuditLogsDto.pageSize = num;
    this.getAudits();
  }

  handleIndexChange(num){
    this.filterAuditLogsDto.pageIndex = num;
    this.getAudits();
  }

  handleSearch(){
    this.filterAuditLogsDto.pageIndex = 1;
    this.getAudits();
  }

}
