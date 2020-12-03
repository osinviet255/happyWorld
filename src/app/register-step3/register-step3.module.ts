import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStep3PageRoutingModule } from './register-step3-routing.module';

import { RegisterStep3Page } from './register-step3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterStep3PageRoutingModule
  ],
  declarations: [RegisterStep3Page]
})
export class RegisterStep3PageModule {}
