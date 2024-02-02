import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessIdPagePageRoutingModule } from './business-id-page-routing.module';

import { BusinessIdPagePage } from './business-id-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessIdPagePageRoutingModule
  ],

  declarations: [BusinessIdPagePage]
})
export class BusinessIdPagePageModule {}
