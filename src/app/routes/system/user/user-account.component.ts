import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {
  constructor(private modalService:NzModalService) { }
  dataSet = [
    {
      key    : '1',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '2',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    },
    {
      key    : '3',
      code   : 'A001',
      name   : '管理员',
      email:'admin@wimisoft.com',
      type :'已启用',
      creatTime:'2018年11月15日 09:00'
    }
  ];
  ngOnInit() {
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
