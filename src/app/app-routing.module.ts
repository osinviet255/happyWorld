import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'welcome-page',
    loadChildren: () => import('./welcome-page/welcome-page.module').then( m => m.WelcomePagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'nap-tien',
    loadChildren: () => import('./nap-tien/nap-tien.module').then( m => m.NapTienPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'register-step2',
    loadChildren: () => import('./register-step2/register-step2.module').then( m => m.RegisterStep2PageModule)
  },
  {
    path: 'register-step3',
    loadChildren: () => import('./register-step3/register-step3.module').then( m => m.RegisterStep3PageModule)
  },
  {
    path: 'register-final',
    loadChildren: () => import('./register-final/register-final.module').then( m => m.RegisterFinalPageModule)
  },
  {
    path: 'forgot-pass-result',
    loadChildren: () => import('./forgot-pass-result/forgot-pass-result.module').then( m => m.ForgotPassResultPageModule)
  },
  {
    path: 'news-category',
    loadChildren: () => import('./news-category/news-category.module').then( m => m.NewsCategoryPageModule)
  },
  {
    path: 'add-room',
    loadChildren: () => import('./add-room/add-room.module').then( m => m.AddRoomPageModule)
  },
  {
    path: 'chat-detail/:roomKey/:nickname',
    loadChildren: () => import('./chat-detail/chat-detail.module').then( m => m.ChatDetailPageModule)
  },
  {
    path: 'user-stock',
    loadChildren: () => import('./stocks/user-stock/user-stock.module').then( m => m.UserStockPageModule)
  },
  {
    path: 'list-project/:projTypeId',
    loadChildren: () => import('./projects/list-project/list-project.module').then( m => m.ListProjectPageModule)
  },
  {
    path: 'project-detail',
    loadChildren: () => import('./projects/project-detail/project-detail.module').then( m => m.ProjectDetailPageModule)
  },
  {
    path: 'buy-stock',
    loadChildren: () => import('./stocks/buy-stock/buy-stock.module').then( m => m.BuyStockPageModule)
  },
  {
    path: 'sell-stock',
    loadChildren: () => import('./stocks/sell-stock/sell-stock.module').then( m => m.SellStockPageModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./users/user-info/user-info.module').then( m => m.UserInfoPageModule)
  },
  {
    path: 'user-edit',
    loadChildren: () => import('./users/user-edit/user-edit.module').then( m => m.UserEditPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'list-news/:catId',
    loadChildren: () => import('./news/list-news/list-news.module').then( m => m.ListNewsPageModule)
  },
  {
    path: 'notification-detail/:notifId',
    loadChildren: () => import('./notification/notification-detail/notification-detail.module').then( m => m.NotificationDetailPageModule)
  },
  {
    path: 'add-conversation',
    loadChildren: () => import('./add-conversation/add-conversation.module').then( m => m.AddConversationPageModule)
  },
  {
    path: 'conversation-detail/:converKey/:nickname',
    loadChildren: () => import('./conversation-detail/conversation-detail.module').then( m => m.ConversationDetailPageModule)
  }


  
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
