import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less']

})
export class ThemeComponent implements OnInit {
  tabIndex = 0;
  tabs=["LOGO设定","主色调","菜单"];
  
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'外观设定'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
