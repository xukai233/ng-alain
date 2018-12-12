import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'edge-device',
  templateUrl: './edge-device.component.html',
  styleUrls: ['./edge-device.component.less']
})
export class EdgeDeviceComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'边缘管理'},
    {title:'边缘设备管理'},
  ]
  tabs = ["我的设备","已售设备","已接入Hub"];
  selectedValue="all"
  loading = false;
  allChecked = false;
  indeterminate = false;
  checkedNumber = 0;
  dataSet = {
    items:[
    {
      id:1,
      a:"123",
      b:"网关",
      c:"1/5",
      d:true,
      e:"123",
      f:new Date(),
      g:new Date(),
      checked:false
    },
    {
      id:2,
      a:"123",
      b:"网关",
      c:"1/5",
      d:true,
      e:"123",
      f:new Date(),
      g:new Date(),
      checked:false
    },
    {
      id:3,
      a:"123",
      b:"终端",
      c:"1/5",
      d:true,
      e:"123",
      f:new Date(),
      g:new Date(),
      checked:false
    }
    ],
    totalCount:3
  }
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  handleTabSelect(data){

  }

  handClear(){
    this.checkAll(false);
  }

   refreshStatus(): void {
    const allChecked = this.dataSet.items.every(value => value.checked === true);
    const allUnChecked = this.dataSet.items.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.checkedNumber = this.dataSet.items.filter(value => value.checked).length;
  }


  checkAll(value:boolean){
    this.dataSet.items.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  handleUpdate(data){
    this.router.navigate(['/edge/device/'+data.id]);
  }

}
