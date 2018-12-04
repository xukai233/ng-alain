import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCreateModalComponent } from './product-create-modal/product-create-modal.component'
@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'边缘管理'},
    {title:'产品'},
  ]
  @ViewChild('createProductModal') createProductModal: ProductCreateModalComponent;

  constructor() { }
  dataSet={
    items:[],
    totalCount:10
  }
  ngOnInit() {
  }

  handleCreate(){
    this.createProductModal.show();
  }

}
