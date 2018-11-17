import { NgModule } from '@angular/core';
import { McInterceptor } from '@core/net/mc.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiServiceProxies } from './service-proxies';
import { JWTInterceptor } from '@delon/auth';

@NgModule({
  providers: [
    ApiServiceProxies,
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: McInterceptor, multi: true }
  ],
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServiceProxiesModule { }
