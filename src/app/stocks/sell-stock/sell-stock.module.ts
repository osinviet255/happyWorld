import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellStockPageRoutingModule } from './sell-stock-routing.module';

import { SellStockPage } from './sell-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellStockPageRoutingModule
  ],
  declarations: [SellStockPage]
})
export class SellStockPageModule {}
