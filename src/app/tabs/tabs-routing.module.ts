import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home-page',
        loadChildren: () => import('../home-page/home-page.module').then( m => m.HomePagePageModule)
      },
      {
        path: 'report',
        loadChildren: () => import('../report/report.module').then( m => m.ReportPageModule)
      },
      {
        path: 'group-chat',
        loadChildren: () => import('../group-chat/group-chat.module').then( m => m.GroupChatPageModule)
      },
      {
        path: 'persional',
        loadChildren: () => import('../persional/persional.module').then( m => m.PersionalPageModule)
      },
      {
        path: 'gioithieu',
        loadChildren: () => import('../gioithieu/gioithieu.module').then( m => m.GioithieuPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home-page',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
