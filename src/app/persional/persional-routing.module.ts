import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersionalPage } from './persional.page';

const routes: Routes = [
  {
    path: '',
    component: PersionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersionalPageRoutingModule {}
