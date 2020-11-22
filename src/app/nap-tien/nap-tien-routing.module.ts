import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NapTienPage } from './nap-tien.page';

const routes: Routes = [
  {
    path: '',
    component: NapTienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NapTienPageRoutingModule {}
