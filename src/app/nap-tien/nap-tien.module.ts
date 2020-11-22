import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NapTienPageRoutingModule } from './nap-tien-routing.module';

import { NapTienPage } from './nap-tien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NapTienPageRoutingModule
  ],
  declarations: [NapTienPage]
})
export class NapTienPageModule {}
