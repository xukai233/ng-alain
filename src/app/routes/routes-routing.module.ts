import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { ResetPasswordComponent } from './passport/reset-password/reset-password.component';
import { FindPasswordComponent } from './passport/find-password/find-password.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { DashboardHomeComponent } from './dashboard/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/home', pathMatch: 'full' },
      { path: 'dashboard/v1', component: DashboardV1Component },
      { path: 'dashboard/home', component: DashboardHomeComponent },
      { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
      { path: 'dashboard/monitor', component: DashboardMonitorComponent },
      { path: 'dashboard/workplace', component: DashboardWorkplaceComponent },
      {
        path: 'system',
        loadChildren: './system/system.module#SystemModule'
      },
      {
        path:'edge',
        loadChildren:'./edge/edge.module#EdgeModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule',
      },
      { path: 'style', loadChildren: './style/style.module#StyleModule' },
      { path: 'delon', loadChildren: './delon/delon.module#DelonModule' },
      { path: 'extras', loadChildren: './extras/extras.module#ExtrasModule' },
      { path: 'pro', loadChildren: './pro/pro.module#ProModule' },
    ],
  },
  // 全屏布局
  {
    path: 'data-v',
    component: LayoutFullScreenComponent,
    canActivateChild: [SimpleGuard],
    children: [
      { path: '', loadChildren: './data-v/data-v.module#DataVModule' },
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'pro-login' },
      },
      {
        path : 'reset',
        component: ResetPasswordComponent,
        data: { title: '重置密码', titleI18n: 'pro-login' },
      },
      {
        path: 'find',
        component: FindPasswordComponent
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
