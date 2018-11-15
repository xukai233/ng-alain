import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { SystemRoutingModule } from './system-routing.module';
import { ThemeComponent } from './theme/theme.component';
import { TenantComponent } from './tenant/tenant.component';

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    ThemeComponent,
    TenantComponent,
  ],
  providers: [],
})
export class SystemModule {}
