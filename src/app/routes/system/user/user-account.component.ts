import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { AccountListDto,AccountServiceProxy,FilterAccountsDto} from '@serviceProxies/service-proxies';
@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {
  constructor(
    private modalService:NzModalService,
    private accountServiceProxy:AccountServiceProxy,
    private router:Router,
    private routerIonfo:ActivatedRoute
  ) { 
    this.filterAccountsDto = new FilterAccountsDto;
  }

  dataSet:AccountListDto[];
  totalCount = 0;
  tableLoading = true;
  filterAccountsDto:FilterAccountsDto
  ngOnInit() {
    this.routerIonfo.params
    .subscribe((params:Params)=>{
      this.filterAccountsDto.accountGroupId = this.routerIonfo.snapshot.params["id"]
      this.getAccount(this.filterAccountsDto);
    })
  }

  getAccount(filterAccounts: FilterAccountsDto | null | undefined): void {
    this.tableLoading = true;
    this.accountServiceProxy
    .doGet(filterAccounts)
    .subscribe(re=>{
      this.dataSet = re.items;
      this.totalCount = re.totalCount;
      this.tableLoading = false;
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

  handleSearch(): void {
    this.getAccount(this.filterAccountsDto)
  }
}
