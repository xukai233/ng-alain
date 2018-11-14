import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    imports: [
      CommonModule
    ],
    providers: [
        ApiServiceProxies.TokenAuthServiceProxy
    ]
})
export class ServiceProxyModule { }