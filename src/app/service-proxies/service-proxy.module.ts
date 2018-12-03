import { NgModule } from '@angular/core';
import { McInterceptor } from '@core/net/mc.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as ApiServiceProxies from './service-proxies';
import { JWTInterceptor } from '@delon/auth';

@NgModule({
  providers: [
    ApiServiceProxies.PassportServiceProxy,
    ApiServiceProxies.TenantServiceProxy,
    ApiServiceProxies.AppServiceProxy,
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.AuditLogServiceProxy,
    ApiServiceProxies.AccountGroupServiceProxy
  ],
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServiceProxyModule { }
