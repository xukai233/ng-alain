import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { SystemRoutingModule } from './system-routing.module';
import { ThemeComponent } from './theme/theme.component';
import { TenantComponent } from './tenant/tenant.component';
import { UserComponent } from './user/user.component';
import { UserAccountComponent } from './user/user-account.component';
import { UserPermissionComponent } from './user/user-permission.component';

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    ThemeComponent,
    TenantComponent,
    UserComponent,
    UserAccountComponent,
    UserPermissionComponent
  ],
  providers: [],
})
export class SystemModule {}
