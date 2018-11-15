import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeComponent } from './theme/theme.component';
import { TenantComponent } from './tenant/tenant.component';

const routes: Routes = [
  { path: 'theme', component: ThemeComponent },
  { path: 'tenant', component: TenantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}