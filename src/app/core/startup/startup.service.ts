import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { zip, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  MenuService,
  SettingsService,
  TitleService,
  ALAIN_I18N_TOKEN,
} from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

import { XmlHttpRequestHelper } from '@shared/helpers/XmlHttpRequestHelper';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      zip(
        this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`),
        this.httpClient.get('http://langwenda.com:7000/mock/58/getall'),
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(this.handleError),
        )
        .subscribe(
          ([langData, appData]) => {
            // setting language data
            this.translate.setTranslation(this.i18n.defaultLang, langData);
            this.translate.setDefaultLang(this.i18n.defaultLang);

            // application data
            const res: any = appData;
            const app = {
              "name": "Master Cloud",
              "description": "Ng-zorro admin panel front-end framework"
            }
            const user = {
              "name": "Admin",
              "avatar": "./assets/tmp/img/avatar.jpg",
              "email": "cipchk@qq.com"
            }
            const menu = [
              {
                "text": "MasterCloud",
                "i18n": "",
                "group": true,
                "hideInBreadcrumb": true,
                "children": [{
                    "text": "工作台",
                    "icon": "anticon anticon-inbox",
                    "link": "/dashboard/workplace",
                    "i18n": "menu.dashboard.workplace"
                  },
                  {
                    "text": "租户",
                    "icon": "anticon anticon-team",
                    "link": "/system/tenant",
                    "i18n": ""
                  },{
                    "text": "APP",
                    "icon": "anticon anticon-appstore",
                    "children":[
                      {
                        "text": "APP管理",
                        "icon": "anticon anticon-appstore",
                        "link": "/system/app",
                        "i18n": ""
                      },
                      {
                        "text": "APP授权",
                        "icon": "anticon anticon-appstore",
                        "link": "/system/appauth",
                        "i18n": ""
                      }
                    ]
                  },
                  {
                    "text": "系统",
                    "i18n": "menu.system",
                    "icon": "anticon anticon-appstore",
                    "children": [{
                        "text": "账号管理",
                        "link": "/system/user",
                        "i18n": ""
                      },
                      {
                        "text": "外观设定",
                        "link": "/system/theme",
                        "i18n": "menu.system.theme"
                      },
                      {
                        "text": "审计日志",
                        "link": "/system/audit",
                        "i18n": ""
                      }
                    ]
                  },{
                    "text": "边缘管理",
                    "icon": "anticon anticon-appstore",
                    "children": [{
                        "text": "产品管理",
                        "link": "/edge/product",
                        "i18n": ""
                      },
                      {
                        "text": "登记注册",
                        "link": "/edge/register",
                        "i18n": ""
                      },
                      {
                        "text": "边缘设备管理",
                        "link": "/edge/device",
                        "i18n": ""
                      }
                    ]
                  }
                ]
              }
            ]
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(app);
            // 用户信息：包括姓名、头像、邮箱地址
            this.settingService.setUser(user);
            // ACL：设置权限为全量
            this.aclService.setFull(true);
            // 初始化菜单
            this.menuService.add(menu);
            // 设置页面标题的后缀
            this.titleService.suffix = app.name;
          },
          (err) => { console.log('Received an error:' + err); },
          () => {
            resolve(null);
          },
        );
    });
  }


}
