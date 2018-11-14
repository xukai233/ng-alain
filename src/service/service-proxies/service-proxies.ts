import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export interface IAuthenticateModel {
    userName: string;
    password: string;
    tenantCode:string | undefined;;
    rememberClient: boolean | undefined;
    returnUrl: string | undefined;
}

export class AuthenticateModel implements IAuthenticateModel {
    userName!: string;
    password!: string;
    tenantCode:string;
    rememberClient!: boolean | undefined;
    returnUrl: string | undefined;

    constructor(data?: IAuthenticateModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userName = data["userName"];
            this.password = data["password"];
            this.tenantCode = data["tenantCode"];
            this.rememberClient = data["rememberClient"];
            this.returnUrl = data["returnUrl"];
        }
    }

    static fromJS(data: any): AuthenticateModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userName"] = this.userName;
        data["password"] = this.password;
        data["tenantCode"] = this.tenantCode;
        data["rememberClient"] = this.rememberClient;
        data["returnUrl"] = this.returnUrl;
        return data; 
    }
}

export class AuthenticateResultModel implements IAuthenticateResultModel {
    accessToken!: string | undefined;
    expireInSeconds!: number | undefined;
    shouldResetPassword!: boolean | undefined;
    passwordResetCode!: string | undefined;
    userId!: number | undefined;
    returnUrl!: string | undefined;

    constructor(data?: IAuthenticateResultModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.accessToken = data["accessToken"];
            this.expireInSeconds = data["expireInSeconds"];
            this.shouldResetPassword = data["shouldResetPassword"];
            this.passwordResetCode = data["passwordResetCode"];
            this.userId = data["userId"];
            this.returnUrl = data["returnUrl"];
        }
    }

    static fromJS(data: any): AuthenticateResultModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateResultModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["expireInSeconds"] = this.expireInSeconds;
        data["shouldResetPassword"] = this.shouldResetPassword;
        data["passwordResetCode"] = this.passwordResetCode;
        data["userId"] = this.userId;
        data["returnUrl"] = this.returnUrl;
        return data; 
    }
}

export interface IAuthenticateResultModel {
    accessToken: string | undefined;
    expireInSeconds: number | undefined;
    shouldResetPassword: boolean | undefined;
    passwordResetCode: string | undefined;
    userId: number | undefined;
    returnUrl: string | undefined;
}

@Injectable()
export class TokenAuthServiceProxy {
    constructor(
      private http: HttpClient
    ) { }
    /**
     * @param model (optional) 
     * @return Success
     */
    authenticate(model: AuthenticateModel | null | undefined): Observable<AuthenticateResultModel> {
      let url_ = "auth/authenticate";
      if(!model.tenantCode){
        model.tenantCode = "host"
      }
      const content_ = JSON.stringify(model);
      return this.http.post<AuthenticateResultModel>(url_, content_)
    }
}