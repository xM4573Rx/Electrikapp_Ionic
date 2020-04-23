import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsTwoPageRoutingModule } from './groups-two-routing.module';

import { GroupsTwoPage } from './groups-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsTwoPageRoutingModule
  ],
  declarations: [GroupsTwoPage]
})
export class GroupsTwoPageModule {}
