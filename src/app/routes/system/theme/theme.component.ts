import {
  Component,
  ChangeDetectionStrategy,
  NgZone,
  Inject,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { LazyService, copy, deepCopy } from '@delon/util';
import { SettingsService } from '@delon/theme';
const ALAINDEFAULTVAR = 'alain-default-vars';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less']

})
export class ThemeComponent implements OnInit {
  tabIndex = 0;
  tabs=["LOGO设定","主色调","菜单"];
  
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'外观设定'},
  ]
  selectColor = "default"
  private loadedLess = false;
  themes = [
    {
      key:'default',
      theme:{
        [`@primary-color`]: '#001529',
        [`@alain-default-header-logo-bg`]: '#002140'
      }
    },
    {
      key:'red',
      theme:{
        [`@primary-color`]: '#F5222D',
        [`@alain-default-header-logo-bg`]: '#ef5e54'
      }
    }
  ]

  constructor(
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private settingSrv: SettingsService,
    private lazy: LazyService,
    private msg: NzMessageService,
    @Inject(DOCUMENT) private doc: any,
  ) { }

  ngOnInit() {
  }

  handleChangeTheme(theme){
    const { zone, msg, cd } = this;
    this.selectColor = theme.key;
    const msgId = msg.loading(`正在编译主题！`, { nzDuration: 0 }).messageId;
    zone.runOutsideAngular(() => {
      this.loadLess().then(() => {
        (window as any).less.modifyVars(this.genVars()).then(() => {
            msg.success('成功');
            msg.remove(msgId);
            zone.run(() => cd.detectChanges());
          });
      });
    });
    console.log(theme)
  }

 private loadLess(): Promise<void> {
    if (this.loadedLess) return Promise.resolve();
    return this.lazy
      .loadStyle(`./assets/alain-wimi.less`, 'stylesheet/less')
      .then(() => {
        const lessConfigNode = this.doc.createElement('script');
        lessConfigNode.innerHTML = `
          window.less = {
            async: true,
            env: 'production',
            javascriptEnabled: true
          };
        `;
        this.doc.body.appendChild(lessConfigNode);
      })
      .then(() =>
        this.lazy.loadScript(
          'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js',
        ),
      )
      .then(() => {
        this.loadedLess = true;
      });
  }

  private genVars() {
    const {selectColor,themes } = this;
    const theme = themes.find(x=>x.key === selectColor)
    const vars: any = {
      ...theme.theme
    };
    this.setLayout(ALAINDEFAULTVAR, vars);
    return vars;
  }

  setLayout(name: string, value: any) {
    this.settingSrv.setLayout(name, value);
  }

}
