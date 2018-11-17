import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {
  constructor() { }
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


}
