import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CashierLoginPageRoutingModule } from './cashier-login-routing.module';

import { CashierLoginPage } from './cashier-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule,
    CashierLoginPageRoutingModule
  ],
  providers:[],
  declarations: [CashierLoginPage]
})
export class CashierLoginPageModule {}
