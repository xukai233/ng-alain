import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '@shared/shared.module';
import { EdgeRoutingModule } from './edge-routing.module';
import { ProductCreateModalComponent } from './product/product-create-modal/product-create-modal.component';
import { RegisterComponent } from './register/register.component'
@NgModule({
  imports: [SharedModule, EdgeRoutingModule],
  declarations: [ProductComponent, ProductCreateModalComponent, RegisterComponent]
})
export class EdgeModule { }
