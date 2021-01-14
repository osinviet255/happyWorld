import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNewsPage } from './list-news.page';

const routes: Routes = [
  {
    path: '',
    component: ListNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListNewsPageRoutingModule {}
