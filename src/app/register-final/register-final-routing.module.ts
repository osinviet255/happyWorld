import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFinalPage } from './register-final.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFinalPageRoutingModule {}
