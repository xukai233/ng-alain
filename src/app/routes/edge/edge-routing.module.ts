import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component'
import { EdgeDeviceComponent } from './edge-device/edge-device.component';
import { EdgeDeviceEditComponent } from './edge-device/edge-device-edit/edge-device-edit.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'device', component: EdgeDeviceComponent },
  { path: 'device/:id', component: EdgeDeviceEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdgeRoutingModule {}