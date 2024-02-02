import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainCashierInterfacePageRoutingModule } from './main-cashier-interface-routing.module';
import { StorageService } from 'src/app/services/storage.service';
import { MainCashierInterfacePage } from './main-cashier-interface.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    MainCashierInterfacePageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [StorageService],
  declarations: [MainCashierInterfacePage]
})
export class MainCashierInterfacePageModule {}
