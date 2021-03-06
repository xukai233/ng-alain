import { Component, OnInit,ViewChild} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { AccountListDto,AccountServiceProxy,FilterAccountsDto} from '@serviceProxies/service-proxies';
import {UserUpdateModalComponent} from './user-update-modal/user-update-modal.component'
import {UserPermissionModalComponent} from './user-permission-modal/user-permission-modal.component'
import {UserService} from './user.service'

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {
  constructor(
    private modalService:NzModalService,
    private accountServiceProxy:AccountServiceProxy,
    private router:Router,
    private routerIonfo:ActivatedRoute,
    private userService:UserService
  ) { 
    this.filterAccountsDto = new FilterAccountsDto;
  }

  dataSet:AccountListDto[];
  totalCount = 0;
  tableLoading = true;
  filterAccountsDto:FilterAccountsDto
  @ViewChild('updateUserModal') updateUserModal: UserUpdateModalComponent;
  @ViewChild('permissionModal') permissionModal: UserPermissionModalComponent;

  ngOnInit() {
    this.userService.loadTable$
    .subscribe(()=>{
      this.getAccount(this.filterAccountsDto);
    })
    
    this.routerIonfo.params
    .subscribe((params:Params)=>{
      if(this.routerIonfo.snapshot.params["id"] && this.routerIonfo.snapshot.params["id"] > 0){
        this.filterAccountsDto.accountGroupId = this.routerIonfo.snapshot.params["id"]
        this.filterAccountsDto.pageIndex = 1;
        this.filterAccountsDto.pageSize = 10;
        this.getAccount(this.filterAccountsDto);
      }
    })
  }

  getAccount(filterAccounts: FilterAccountsDto | null | undefined): void {
    this.tableLoading = true;
    this.accountServiceProxy
    .list(filterAccounts)
    .subscribe(re=>{
      this.dataSet = re.items;
      this.totalCount = re.totalCount;
      this.tableLoading = false;
    })
  }

  handleDelete(data:AccountListDto):void{
    this.modalService.confirm({
      nzTitle  : `<i>删除账号:${data.displayName}</i>`,
      nzContent: '<b>该操作将删除账号且不可逆，确认删除?</b>',
      nzOkText:'删除',
      nzOkType:'danger',
      nzOnOk   : () => this.deleteAccount(data)
    });
  }

  deleteAccount(data:AccountListDto){
    this.accountServiceProxy
    .delete(data.id)
    .subscribe(re=>{
      this.getAccount(this.filterAccountsDto);
    })
  }

  handleChange(data:AccountListDto):void {
    this.updateUserModal.show(data);
  }

  handleChangePermission(data:AccountListDto){
    this.permissionModal.show(data);
  }

  handleSearch(): void {
    this.filterAccountsDto.pageIndex = 1;
    this.getAccount(this.filterAccountsDto);
  }
  handleModalSave(){
    this.getAccount(this.filterAccountsDto);
  }
  handlePageSizeChange(num){
    this.filterAccountsDto.pageIndex = 1;
    this.filterAccountsDto.pageSize = num;
    this.getAccount(this.filterAccountsDto);
  }
  handleIndexChange(num){
    this.filterAccountsDto.pageIndex = num;
    this.getAccount(this.filterAccountsDto);
  }
}
