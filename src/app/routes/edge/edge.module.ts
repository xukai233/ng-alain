import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '@shared/shared.module';
import { EdgeRoutingModule } from './edge-routing.module';
import { ProductCreateModalComponent } from './product/product-create-modal/product-create-modal.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCreateModalComponent } from './register/register-create-modal/register-create-modal.component';
import { EdgeDeviceComponent } from './edge-device/edge-device.component';
import { EdgeDeviceEditComponent } from './edge-device/edge-device-edit/edge-device-edit.component';
import { DeviceEditModalComponent } from './edge-device/edge-device-edit/device-edit-modal/device-edit-modal.component';
import { DeviceConfigModalComponent } from './edge-device/edge-device-edit/device-config-modal/device-config-modal.component';
@NgModule({
  imports: [SharedModule, EdgeRoutingModule],
  declarations: [ProductComponent, ProductCreateModalComponent, RegisterComponent, RegisterCreateModalComponent, EdgeDeviceComponent, EdgeDeviceEditComponent, DeviceEditModalComponent, DeviceConfigModalComponent]
})
export class EdgeModule { }
