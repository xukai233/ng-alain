import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor,
    HttpHeaders,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpEvent,
    HttpHeaderResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { LogService } from '@core/log/log.service';

export interface IErrorInfo {

    code: number;

    message: string;

    details: string;

}

export interface IAjaxResponse {

    success: boolean;

    result?: any;

    targetUrl?: string;

    error?: IErrorInfo;

    unAuthorizedRequest: boolean;

    __mc: boolean;

}

@Injectable()
export class McHttpConfiguration {

    constructor(
        private injector: Injector,
        private _logService: LogService) {

    }

    get message(): NzModalService {
        return this.injector.get(NzModalService);
    }

    defaultError = <IErrorInfo>{
        message: 'An error has occurred!',
        details: 'Error details were not sent by server.'
    };

    defaultError401 = <IErrorInfo>{
        message: 'You are not authenticated!',
        details: 'You should be authenticated (sign in) in order to perform this operation.'
    };

    defaultError403 = <IErrorInfo>{
        message: 'You are not authorized!',
        details: 'You are not allowed to perform this operation.'
    };

    defaultError404 = <IErrorInfo>{
        message: 'Resource not found!',
        details: 'The resource requested could not be found on the server.'
    };

    logError(error: IErrorInfo): void {
        this._logService.error(error);
    }

    showError(error: IErrorInfo): any {
        if (error.details) {
            return this.message.error({nzTitle : error.message || this.defaultError.message, nzContent : error.details});
        } else {
            return this.message.error({nzTitle : error.message || this.defaultError.message});
        }
    }

    handleTargetUrl(targetUrl: string): void {
        if (!targetUrl) {
            location.href = '/';
        } else {
            location.href = targetUrl;
        }
    }

    handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
        const self = this;

        if (messagePromise) {
            messagePromise.done(() => {
                this.handleTargetUrl(targetUrl || '/');
            });
        } else {
            self.handleTargetUrl(targetUrl || '/');
        }
    }

    handleNonMcErrorResponse(response: HttpResponse<any>) {
        const self = this;
        switch (response.status) {
            case 401:
                self.handleUnAuthorizedRequest(
                    self.showError(self.defaultError401),
                    '/passport/login'
                );
                break;
            case 403:
                self.showError(self.defaultError403);
                break;
            case 404:
                self.showError(self.defaultError404);
                break;
            default:
                self.showError(self.defaultError);
                break;
        }
    }

    handleMcResponse(response: HttpResponse<any>, ajaxResponse: IAjaxResponse): HttpResponse<any> {
        let newResponse: HttpResponse<any>;
        if (ajaxResponse.success) {
            
            newResponse = response.clone({
                body: ajaxResponse.result
            });

            if (ajaxResponse.targetUrl) {
                this.handleTargetUrl(ajaxResponse.targetUrl);
            }
        } else {

            newResponse = response.clone({
                body: ajaxResponse.result
            });

            if (!ajaxResponse.error) {
                ajaxResponse.error = this.defaultError;
            }

            this.logError(ajaxResponse.error);
            this.showError(ajaxResponse.error);

            if (response.status === 401) {
                this.handleUnAuthorizedRequest(null, ajaxResponse.targetUrl);
            }
        }

        return newResponse;
    }

    getMcAjaxResponseOrNull(response: HttpResponse<any>): IAjaxResponse | null {
        if (!response || !response.headers) {
            return null;
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType) {
            this._logService.warn('Content-Type is not sent!');
            return null;
        }

        if (contentType.indexOf('application/json') < 0) {
            this._logService.warn('Content-Type is not application/json: ' + contentType);
            return null;
        }
        
        const responseObj = JSON.parse(JSON.stringify(response.body));
        if (!responseObj.__mc) {
            return null;
        }

        return responseObj as IAjaxResponse;
    }

    handleResponse(response: HttpResponse<any>): HttpResponse<any> {
        const ajaxResponse = this.getMcAjaxResponseOrNull(response);
        if (ajaxResponse == null) {
            return response;
        }

        return this.handleMcResponse(response, ajaxResponse);
    }

    blobToText(blob: any): Observable<string> {
        return new Observable<string>((observer: any) => {
            if (!blob) {
                observer.next('');
                observer.complete();
            } else {
                const reader = new FileReader(); 
                reader.onload = function() { 
                    observer.next(this.result);
                    observer.complete();
                };
                reader.readAsText(blob); 
            }
        });
    }
}

@Injectable()
export class McInterceptor implements HttpInterceptor {
    protected configuration: McHttpConfiguration;

    constructor(configuration: McHttpConfiguration) {
        this.configuration = configuration;
     }
     
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const interceptObservable = new Subject<HttpEvent<any>>();
        const modifiedRequest = this.normalizeRequestHeaders(request);

        next.handle(modifiedRequest)
            .subscribe((event: HttpEvent<any>) => {
                this.handleSuccessResponse(event, interceptObservable);
            }, (error: any) => {
                return this.handleErrorResponse(error, interceptObservable);
            });

        return interceptObservable;
    }

    protected normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
        let modifiedHeaders = new HttpHeaders();
        modifiedHeaders = request.headers.set('Pragma', 'no-cache')
            .set('Cache-Control', 'no-cache')
            .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
            .set('X-Requested-With', 'XMLHttpRequest');

        return request.clone({
            headers: modifiedHeaders
        });
    }

    protected handleSuccessResponse(event: HttpEvent<any>, interceptObservable: Subject<HttpEvent<any>>): void {
        const self = this;

        if (event instanceof HttpResponse) {
            if (event.body instanceof Blob && event.body.type && event.body.type.indexOf('application/json') >= 0) {
                const clonedResponse = event.clone();
                
                self.configuration.blobToText(event.body).subscribe(json => {
                    const responseBody = json === 'null' ? {} : JSON.parse(json);
                    
                    const modifiedResponse = self.configuration.handleResponse(event.clone({
                        body: responseBody
                    }));
                    
                    interceptObservable.next(modifiedResponse.clone({
                        body: new Blob([JSON.stringify(modifiedResponse.body)], {type : 'application/json'})
                    }));

                    interceptObservable.complete();
                });
            } else {
                interceptObservable.next(event);
                interceptObservable.complete();
            }
        }
    }

    protected handleErrorResponse(error: any, interceptObservable: Subject<HttpEvent<any>>): Observable<any> {
        const errorObservable = new Subject<any>();

        if (!(error.error instanceof Blob)) {
            interceptObservable.error(error);
            interceptObservable.complete();
            return of({});
        }

        this.configuration.blobToText(error.error).subscribe(json => {
            const errorBody = (json === '' || json === 'null') ? {} : JSON.parse(json);
            const errorResponse = new HttpResponse({
                headers: error.headers,
                status: error.status,
                body: errorBody
            });

            const ajaxResponse = this.configuration.getMcAjaxResponseOrNull(errorResponse);
            
            if (ajaxResponse != null) {
                this.configuration.handleMcResponse(errorResponse, ajaxResponse);
            } else {
                this.configuration.handleNonMcErrorResponse(errorResponse);
            }

            errorObservable.complete();
            
            interceptObservable.error(error);
            interceptObservable.complete();
        });
        
        return errorObservable;
    }
}
