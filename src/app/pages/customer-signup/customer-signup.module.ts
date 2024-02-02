import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerSignupPageRoutingModule } from './customer-signup-routing.module';

import { CustomerSignupPage } from './customer-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerSignupPageRoutingModule
  ],
  declarations: [CustomerSignupPage]
})
export class CustomerSignupPageModule {}
