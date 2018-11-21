import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { SystemRoutingModule } from './system-routing.module';
import { ThemeComponent } from './theme/theme.component';
import { TenantComponent } from './tenant/tenant.component';
import { UserComponent } from './user/user.component';
import { CreateTenantModalComponent } from './tenant/tenant-create-modal/tenant-create-modal.component';


@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    ThemeComponent,
    TenantComponent,
    UserComponent,
    CreateTenantModalComponent
  ],
  providers: [],
})
export class SystemModule {}
