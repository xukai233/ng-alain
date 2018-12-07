import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { SystemRoutingModule } from './system-routing.module';
import { ThemeComponent } from './theme/theme.component';
import { TenantComponent } from './tenant/tenant.component';
import { UserComponent } from './user/user.component';
import { UserAccountComponent } from './user/user-account.component';
import { UserPermissionComponent } from './user/user-permission.component';
import { CreateTenantModalComponent } from './tenant/tenant-create-modal/tenant-create-modal.component';


import { AuditComponent } from './audit/audit.component';
import { AppAuthComponent } from './app-auth/app-auth.component';
import { TenantUpdateModalComponent } from './tenant/tenant-update-modal/tenant-update-modal.component';
import { AppListComponent } from './app-list/app-list.component';
import { UserCreateModalComponent } from './user/user-create-modal/user-create-modal.component';
import { UserUpdateModalComponent } from './user/user-update-modal/user-update-modal.component';
import { AppAuthCreateComponent } from './app-auth/app-auth-create/app-auth-create.component';
import { AppAuthUpdateComponent } from './app-auth/app-auth-update/app-auth-update.component';
import { UserPermissionModalComponent } from './user/user-permission-modal/user-permission-modal.component';

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    ThemeComponent,
    TenantComponent,
    UserComponent,
    UserAccountComponent,
    CreateTenantModalComponent,
    UserPermissionComponent,
    AuditComponent,
    AppAuthComponent,
    TenantUpdateModalComponent,
    AppListComponent,
    UserCreateModalComponent,
    UserUpdateModalComponent,
    AppAuthCreateComponent,
    AppAuthUpdateComponent,
    UserPermissionModalComponent
  ],
  providers: [],
})
export class SystemModule {}
