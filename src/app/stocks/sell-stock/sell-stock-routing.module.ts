import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellStockPage } from './sell-stock.page';

const routes: Routes = [
  {
    path: '',
    component: SellStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellStockPageRoutingModule {}
