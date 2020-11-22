import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersionalPageRoutingModule } from './persional-routing.module';

import { PersionalPage } from './persional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersionalPageRoutingModule
  ],
  declarations: [PersionalPage]
})
export class PersionalPageModule {}
