import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyStockPage } from './buy-stock.page';

const routes: Routes = [
  {
    path: '',
    component: BuyStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyStockPageRoutingModule {}
