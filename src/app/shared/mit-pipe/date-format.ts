import { Pipe, PipeTransform } from '@angular/core';
const moment = require('moment');

// 管道装师符 ， name就是管道名称
@Pipe({
  name: 'DateFormat'
})


export class DateFormatPipe implements PipeTransform {
  // value : 就是传入的值
  // ...args : 参数集合(用了...拓展符),会把数组内的值依次作为参数传入
  // ...args可以改成我们常规的写法(value:any,start:number,end:number)
  transform(value: any): any {
    if(value === 1000){
      return "无期限"
    }else{
      return moment(value).format("YYYY-MM-DD HH:mm:SS")
    }
  }
}