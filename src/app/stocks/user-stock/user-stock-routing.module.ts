import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserStockPage } from './user-stock.page';

const routes: Routes = [
  {
    path: '',
    component: UserStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserStockPageRoutingModule {}
