import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  { path: 'theme', component: ThemeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}