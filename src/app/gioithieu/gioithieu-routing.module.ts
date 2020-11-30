import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GioithieuPage } from './gioithieu.page';

const routes: Routes = [
  {
    path: '',
    component: GioithieuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GioithieuPageRoutingModule {}
