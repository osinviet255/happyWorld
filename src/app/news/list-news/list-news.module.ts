import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListNewsPageRoutingModule } from './list-news-routing.module';

import { ListNewsPage } from './list-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListNewsPageRoutingModule
  ],
  declarations: [ListNewsPage]
})
export class ListNewsPageModule {}
