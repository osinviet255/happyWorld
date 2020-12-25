import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyStockPageRoutingModule } from './buy-stock-routing.module';

import { BuyStockPage } from './buy-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyStockPageRoutingModule
  ],
  declarations: [BuyStockPage]
})
export class BuyStockPageModule {}
