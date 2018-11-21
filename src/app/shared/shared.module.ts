import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import { ThemeSelectComponent } from './theme-select/theme-select.component';
import { FormItemComponent } from './form-item/form-item.component';
import { WimiTableComponent } from './wimi-table/wimi-table.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { WimiLeftMenuComponent } from './wimi-left-menu/wimi-left-menu.component';
import { WimiTabComponent } from './wimi-tab/wimi-tab.component';
import { WimiFourGridComponent } from './wimi-four-grid/wimi-four-grid.component';
import { WimiAppBoardComponent } from './wimi-app-board/wimi-app-board.component';
import { WimiVerifyComponent } from './wimi-verify/wimi-verify.component'

const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule,
  UEditorModule,
  NgxTinymceModule,
];
// #endregion

// #region your componets & directives
const COMPONENTS = [
    BreadcrumbComponent,
    ThemeSelectComponent,
    FormItemComponent,
    WimiTableComponent,
    CopyrightComponent,
    WimiLeftMenuComponent,
    WimiTabComponent,
    WimiFourGridComponent,
    WimiAppBoardComponent,
    WimiVerifyComponent
  ];
const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
