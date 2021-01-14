import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConversationPageRoutingModule } from './add-conversation-routing.module';

import { AddConversationPage } from './add-conversation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddConversationPageRoutingModule
  ],
  declarations: [AddConversationPage]
})
export class AddConversationPageModule {}
