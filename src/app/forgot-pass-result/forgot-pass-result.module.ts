import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPassResultPageRoutingModule } from './forgot-pass-result-routing.module';

import { ForgotPassResultPage } from './forgot-pass-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPassResultPageRoutingModule
  ],
  declarations: [ForgotPassResultPage]
})
export class ForgotPassResultPageModule {}
