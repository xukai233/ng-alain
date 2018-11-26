import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AccountListDto,AccountServiceProxy} from '@serviceProxies/service-proxies';
@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {
  constructor(
    private modalService:NzModalService,
    private accountServiceProxy:AccountServiceProxy) { }

  dataSet:AccountListDto[];
  totalCount = 0;

  ngOnInit() {
    this.getAccount();
  }

  getAccount(): void {
    this.accountServiceProxy
    .doGet(null)
    .subscribe(re=>{
      this.dataSet = re.items;
      this.totalCount = re.totalCount;
      console.log(re)
    })
  }

  handleDelete():void{
    this.modalService.confirm({
      nzTitle  : '<i>删除账号</i>',
      nzContent: '<b>该操作将删除账号且不可逆，确认删除?</b>',
      nzOkText:'删除',
      nzOkType:'danger',
      nzOnOk   : () => console.log('OK')
    });
  }
}
