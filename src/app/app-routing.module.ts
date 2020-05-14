import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then( m => m.GroupsPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  },
  {
    path: 'groups-two',
    loadChildren: () => import('./groups-two/groups-two.module').then( m => m.GroupsTwoPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'control',
    loadChildren: () => import('./control/control.module').then( m => m.ControlPageModule)
  },
  {
    path: 'timer',
    loadChildren: () => import('./timer/timer.module').then( m => m.TimerPageModule)
  },
  {
    path: 'central',
    loadChildren: () => import('./settings/central/central.module').then( m => m.CentralPageModule)
  },
  {
    path: 'device',
    loadChildren: () => import('./settings/device/device.module').then( m => m.DevicePageModule)
  },
  {
    path: 'cost',
    loadChildren: () => import('./settings/cost/cost.module').then( m => m.CostPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./settings/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'date',
    loadChildren: () => import('./settings/date/date.module').then( m => m.DatePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
