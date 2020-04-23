import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsTwoPage } from './groups-two.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsTwoPageRoutingModule {}
