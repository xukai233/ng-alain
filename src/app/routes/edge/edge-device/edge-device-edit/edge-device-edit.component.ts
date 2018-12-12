import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DeviceEditModalComponent } from './device-edit-modal/device-edit-modal.component'
import { DeviceConfigModalComponent } from './device-config-modal/device-config-modal.component'

@Component({
  selector: 'edge-device-edit',
  templateUrl: './edge-device-edit.component.html',
  styleUrls: ['./edge-device-edit.component.less']
})
export class EdgeDeviceEditComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'边缘管理'},
    {title:'边缘设备管理',link:'/edge/device'},
    {title:'masterlink\\4424324'},
  ]
  breadcrumbTitle = 'masterlink\\4424324'
  tabs = ["物模型","运行状态","日志服务"];
  dataSet = {
    items:[
    {
      id:1,
      a:"事件",
      b:"固件更新",
      c:"UpdateEvent",
      d:"-",
      e:"-",
      f:"-",
    },
    {
      id:2,
      a:"服务",
      b:"关闭网关",
      c:"ShutDown",
      d:"-",
      e:"-",
      f:"-",
    },
    {
      id:3,
      a:"属性",
      b:"PLC报警",
      c:"PLCAlarn",
      d:"struct",
      e:"alarm",
      f:"在线/离线",
    }
    ],
    totalCount:3
  }
  @ViewChild('editDeviceModel') editDeviceModel: DeviceEditModalComponent;
  @ViewChild('configDeviceModel') configDeviceModel: DeviceConfigModalComponent;

  constructor(
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {
  }

  handleGoBack(){
     this.location.back();
  }
  handleChangeLink(){
    console.log(123)
  }

  handleDeviceEdit(){
    // 打开设定驱动
    this.editDeviceModel.show();
  }
  
  handleDeviceConfig(){
    // 打开边缘设备配置
    this.configDeviceModel.show();
  }
  // 点击刷新按钮
  handleRefresh(){

  }
  handleTabSelect(data){}
}
