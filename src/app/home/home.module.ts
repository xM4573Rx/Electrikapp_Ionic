import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { HomePage } from './home.page';
import { HomePopoverComponent } from '../home-popover/home-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCircleProgressModule.forRoot(),
    HomePageRoutingModule
  ],
  entryComponents: [HomePopoverComponent],
  declarations: [HomePage, HomePopoverComponent]
})
export class HomePageModule {}
