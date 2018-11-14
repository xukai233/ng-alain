import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { SystemRoutingModule } from './system-routing.module';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    ThemeComponent,
  ],
  providers: [],
})
export class SystemModule {}
