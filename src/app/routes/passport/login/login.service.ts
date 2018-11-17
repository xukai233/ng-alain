import { Injectable } from '@angular/core';
import { Inject} from '@angular/core';
import { AuthenticateModel, AuthenticateResultModel, ApiServiceProxies } from '@shared/service-proxies/service-proxies';
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
    private _tokenAuthService: ApiServiceProxies,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private router: Router,
  ) { }
  
  // 登陆
  authenticate(finallyCallback?: () => void, redirectUrl?: string): void {

    finallyCallback = finallyCallback || (() => { });
    this._tokenAuthService
      .passportAuthenticate(this.authenticateModel)
      .pipe(finalize(finallyCallback))
      .subscribe((result: AuthenticateResultModel) => {
        this.processAuthenticateResult(result, redirectUrl);
      });
  }
  // 将token信息持久化
  private processAuthenticateResult(authenticateResult: AuthenticateResultModel, redirectUrl?: string) {
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
