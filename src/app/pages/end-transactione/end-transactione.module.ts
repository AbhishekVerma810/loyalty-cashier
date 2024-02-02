import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndTransactionePageRoutingModule } from './end-transactione-routing.module';

import { EndTransactionePage } from './end-transactione.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndTransactionePageRoutingModule
  ],
  declarations: [EndTransactionePage]
})
export class EndTransactionePageModule {}
