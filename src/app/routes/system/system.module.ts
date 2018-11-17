import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { SystemRoutingModule } from './system-routing.module';
import { ThemeComponent } from './theme/theme.component';
import { TenantComponent } from './tenant/tenant.component';
import { UserComponent } from './user/user.component';
import { ApiServiceProxies } from '@shared/service-proxies/service-proxies';


@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    ThemeComponent,
    TenantComponent,
    UserComponent,
  ],
  providers: [ApiServiceProxies],
})
export class SystemModule {}
