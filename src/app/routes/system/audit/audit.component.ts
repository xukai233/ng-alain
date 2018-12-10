import { Component, OnInit } from '@angular/core';
import { FilterAuditLogsDto,AuditLogsListDto,AuditLogServiceProxy} from '@serviceProxies/service-proxies';
const moment = require('moment');
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
  statusList = [
    { text: '200成功', value: '200' },
    { text: '300错误', value: '300' },
    { text: '400错误', value: '400' }
  ];
  rangePickerStyle = {
    "width":"100%"
  }
  searchTag="近1小时";
  isCollapse = true;
  dataSet:AuditLogsListDto[];
  totalCount = 0;
  tableLoading = false;
  filterAuditLogsDto:FilterAuditLogsDto;
  timeArea = [];
  constructor(
    private auditLogServiceProxy:AuditLogServiceProxy
    ){ 
    this.filterAuditLogsDto = new FilterAuditLogsDto();
    this.filterAuditLogsDto.pageIndex = 1;
    this.filterAuditLogsDto.pageSize = 10;
    this.filterAuditLogsDto.createTimeEnd = new Date().getTime();
    this.filterAuditLogsDto.createTimeFrom = moment().add(-1, 'h').valueOf();
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
    if(this.timeArea&&this.timeArea.length == 2){
      this.filterAuditLogsDto.createTimeFrom = Date.parse(this.timeArea[0])
      this.filterAuditLogsDto.createTimeEnd = Date.parse(this.timeArea[1])
    }
    this.getAudits();
  }

  handleSearchTagChange(tag:string){
    this.searchTag = tag;
    switch (tag) {
      case "近1小时":
        this.filterAuditLogsDto.createTimeFrom = moment().add(-1, 'h').valueOf();
        break;
      case "今日":
        this.filterAuditLogsDto.createTimeFrom = moment().add(-1, 'd').valueOf();
        break;
      case "近7日":
        this.filterAuditLogsDto.createTimeFrom = moment().add(-7, 'd').valueOf();
      default:
        // code...
        break;
    }
    this.filterAuditLogsDto.createTimeEnd = new Date().getTime();
    this.getAudits();
  }

  filter(data): void {
    if(data){
      this.filterAuditLogsDto.status = data;
      this.getAudits();
    }
  }

}
