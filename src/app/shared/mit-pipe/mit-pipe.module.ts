import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './date-format'

const pipe =  [
  DateFormatPipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...pipe],
  exports:[...pipe]
})
export class MitPipeModule { }
