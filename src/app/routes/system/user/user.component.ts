import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { AccountGroupDto,AccountGroupServiceProxy,
  AccountServiceProxy,CreateAccountGroupDto,UpdateAccountGroupDto} from '@serviceProxies/service-proxies';
import {UserCreateModalComponent} from './user-create-modal/user-create-modal.component'
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'账号管理'},
  ]
  tabs = ["平台账号","权限"]
  selectTab = "平台账号"
  userGroupId = 0
  leftMenu = [
  ]
  showNewAccountGroup = false;
  accountGroupName = "";
  accountGroutId = 0;
  @ViewChild('createUserModal') createUserModal: UserCreateModalComponent;
  modalIsVisible = false;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private accountGroupServiceProxy:AccountGroupServiceProxy,
    private accountServiceProxy:AccountServiceProxy,
    private routerIonfo:ActivatedRoute,
    private message: NzMessageService,
    private modalService:NzModalService,
    ) { 
  }
  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if("/system/user/account" === this.router.url){
        this.selectTab = "平台账号"
      }
      if("/system/user/permission" === this.router.url){
        this.selectTab = "权限"
      }
    });
    this.getAccountGroup();
  }

  getAccountGroup(){
    this.accountGroupServiceProxy
    .list()
    .subscribe(re=>{
      this.leftMenu = re.items;
      this.router.navigate([`/system/user/account`,this.leftMenu[0].id]);
      this.userGroupId = this.leftMenu[0].id;
    })
  }

  handleLeftSelect(val){
    this.router.navigate([`/system/user/account`,val.id]);
    this.userGroupId = val.id;
  }
  handleChangeName(data){
    this.accountGroupName = data.displayName;
    this.accountGroutId = data.id;
    this.showNewAccountGroup = true;
  }
  handleAccountGroupDelete(data){
    this.modalService.confirm({
      nzTitle  : '<i>删除用户组</i>',
      nzContent: '<b>该操作将删除账号且不可逆，确认删除?</b>',
      nzOkText:'删除',
      nzOkType:'danger',
      nzOnOk   : () => {this.deleteAccountGroup(data)}
    });
  }
  deleteAccountGroup(data): void {
    this.accountGroupServiceProxy
    .delete(data.id)
    .subscribe(re=>{
      this.getAccountGroup();
    })
  }
  handleTabSelect(val){ 
    switch (val) {
      case "平台账号":
        this.router.navigate(['/system/user/account',this.userGroupId])
        break;
      case "权限":
        this.router.navigate(['/system/user/permission',this.userGroupId])
        break;
      default:
        // code...
        break;
    }
  }
  handleAddClick(){
    this.createUserModal.show()
  }

  handleShowCreateAccountGroup(): void {
    this.showNewAccountGroup = true;
  }
  handleCancle(): void {
    this.accountGroutId = 0;
    this.showNewAccountGroup = false;
    this.accountGroupName = "";
  }
  handleCreateAccountGroup(name): void {
    if(!name){
      this.message.create('error','请输入组名')
      return;
    }
    if(this.accountGroutId === 0){
      let createAccountGroupDto = new CreateAccountGroupDto();
      createAccountGroupDto.displayName = name;
      createAccountGroupDto.isDefault = false;
      this.accountServiceProxy
      .add2(createAccountGroupDto)
      .subscribe(re=>{
        this.accountGroupName = "";
        this.showNewAccountGroup = false;
        this.getAccountGroup();
      })
    }else{
      let updateAccountGroupDto = new UpdateAccountGroupDto();
      updateAccountGroupDto.displayName = name;
      this.accountGroupServiceProxy
      .update(this.accountGroutId,updateAccountGroupDto)
      .subscribe(re=>{
        this.accountGroupName = "";
        this.accountGroutId = 0;
        this.showNewAccountGroup = false;
        this.getAccountGroup();
      })
    }
  }
}
