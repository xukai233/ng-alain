import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeComponent } from './theme/theme.component';
import { TenantComponent } from './tenant/tenant.component';
import { UserComponent } from './user/user.component';
import { UserAccountComponent } from './user/user-account.component';
import { UserPermissionComponent } from './user/user-permission.component';
import { AuditComponent } from './audit/audit.component';

const routes: Routes = [
  { path: 'theme', component: ThemeComponent },
  { path: 'tenant', component: TenantComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'user', component: UserComponent,children:[
    { path: '', redirectTo: 'account', pathMatch: 'full' },
    { path: 'account', component: UserAccountComponent },
    { path: 'permission', component: UserPermissionComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}