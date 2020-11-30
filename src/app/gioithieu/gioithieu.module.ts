import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GioithieuPageRoutingModule } from './gioithieu-routing.module';

import { GioithieuPage } from './gioithieu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GioithieuPageRoutingModule
  ],
  declarations: [GioithieuPage]
})
export class GioithieuPageModule {}
