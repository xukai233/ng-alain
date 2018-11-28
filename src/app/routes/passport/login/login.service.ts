import { Injectable } from '@angular/core';
import { Inject} from '@angular/core';
import { AuthenticateModel, AuthenticateResultModel, PassportServiceProxy } from '@serviceProxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { ReuseTabService } from '@delon/abc';
import { Router } from '@angular/router';

import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
@Injectable()
export class LoginService {
  public authenticateModel = new AuthenticateModel();
  public test: string;
  constructor(
    private _passportService: PassportServiceProxy,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private router: Router,
  ) 
  { 
    this.authenticateModel.tenantCode = "wimi"
    this.authenticateModel.userName = "langwenda"
    this.authenticateModel.password = "123456"
  }
  
  // 登陆
  authenticate(finallyCallback?: () => void, redirectUrl?: string): void {

    this._passportService
      .authenticate(this.authenticateModel)
      .pipe(finalize(finallyCallback))
      .subscribe((result: AuthenticateResultModel) => {
        this.processAuthenticateResult(result, redirectUrl);
      });
  }
  // 将token信息持久化
  private processAuthenticateResult(authenticateResult: AuthenticateResultModel, redirectUrl?: string) {
    if(authenticateResult.shouldResetPassword){
      this.router.navigateByUrl('/passport/reset?code='+authenticateResult.passwordResetCode);
    }else{
      // 清空路由复用信息
      this.reuseTabService.clear();
      // 设置Token信息
      this.tokenService.set({token: authenticateResult.accessToken});
      if (authenticateResult.returnUrl) {
        this.router.navigate([authenticateResult.returnUrl]);
      } else { 
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
