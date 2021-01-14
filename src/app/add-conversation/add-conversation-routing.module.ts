import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddConversationPage } from './add-conversation.page';

const routes: Routes = [
  {
    path: '',
    component: AddConversationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddConversationPageRoutingModule {}
