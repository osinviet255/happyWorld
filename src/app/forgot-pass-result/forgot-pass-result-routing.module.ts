import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPassResultPage } from './forgot-pass-result.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPassResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPassResultPageRoutingModule {}
