import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserStockPageRoutingModule } from './user-stock-routing.module';

import { UserStockPage } from './user-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserStockPageRoutingModule
  ],
  declarations: [UserStockPage]
})
export class UserStockPageModule {}
