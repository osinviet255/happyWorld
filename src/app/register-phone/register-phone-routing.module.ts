import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPhonePage } from './register-phone.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPhonePageRoutingModule {}
