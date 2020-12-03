import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFinalPageRoutingModule } from './register-final-routing.module';

import { RegisterFinalPage } from './register-final.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterFinalPageRoutingModule
  ],
  declarations: [RegisterFinalPage]
})
export class RegisterFinalPageModule {}
