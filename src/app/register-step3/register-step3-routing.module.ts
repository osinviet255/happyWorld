import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterStep3Page } from './register-step3.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterStep3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterStep3PageRoutingModule {}
