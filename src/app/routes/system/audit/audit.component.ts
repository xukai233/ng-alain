import { Component, OnInit } from '@angular/core';
import { AuditLogsListDto,AuditLogServiceProxy} from '@serviceProxies/service-proxies';

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
  tableLoading = true;

  constructor(
    private auditLogServiceProxy:AuditLogServiceProxy
    ) { }

  ngOnInit() {
    this.getAudits();
  }
  getAudits(){
    this.auditLogServiceProxy
    .do(null)
    .subscribe(re=>{
      console.log(re)
      this.dataSet = re.items;
      this.totalCount = re.totalCount;
      this.tableLoading = false;
    })
  }

  toggleCollapse(){
    this.isCollapse = !this.isCollapse
  }

}
