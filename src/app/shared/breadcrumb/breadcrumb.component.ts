import { Component, OnInit,Input } from '@angular/core';
import Breadcrumb from './breadcrumb'


@Component({
  selector: 'wimi-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {
  @Input() data:Breadcrumb[]
  @Input() title:string
  @Input() icon:string
  constructor() { }

  ngOnInit() {
  }

}
