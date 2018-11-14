import { Injectable } from '@angular/core';
import { AuthenticateModel,AuthenticateResultModel,TokenAuthServiceProxy,IAuthenticateModel} from '@service/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoginService {
  public authenticateModel = new AuthenticateModel()
  public test:string;
  constructor(
    private _tokenAuthService: TokenAuthServiceProxy,
  ) { }
  
  // 登陆
  authenticate(finallyCallback?: () => void, redirectUrl?: string): void {

    finallyCallback = finallyCallback || (() => { });
    this._tokenAuthService
      .authenticate(this.authenticateModel)
      .pipe(finalize(finallyCallback))
      .subscribe((result: AuthenticateResultModel) => {
        console.log("alan",result)
      });
  }
}