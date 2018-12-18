import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule ,OnInit,Input} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
const DataSet = require('@antv/data-set');

@Component({
  selector: 'chart-ring-pie',
  templateUrl: './chart-ring-pie.component.html',
  styleUrls: ['./chart-ring-pie.component.less']
})
export class ChartRingPieComponent implements OnInit {
  @Input() sourceData = [];
  @Input() title:string;
  @Input() text:string;
  forceFit: boolean = true;
  height: number = 150;
  data:any;
  scale:any;
  pieStyle = {
    stroke: "#fff",
    lineWidth: 1,
  };
  htmlGuidePosition = ['50%', '50%'];
  guideHtml:string;
  color = ['count', [ '#ff8663','#ffb818', '#4a90e2']]
  constructor() { 
    this.scale = [{
      dataKey: 'percent',
      min: 0,
      formatter: '.0%',
    }];
  }

  ngOnInit() {
    const dv = new DataSet.View().source(this.sourceData);
    dv.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    this.data = dv.rows;
    let count = 0;
    for(let item of this.sourceData){
      count += item.count;
    }
    this.guideHtml = '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;"><span style="color:#4a90e2;font-size:20px;font-weight: 600">'+count+'</span><br>'+this.title+'</div>';
  }

}
