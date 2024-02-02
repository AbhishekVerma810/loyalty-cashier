import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionSuccessfulPageRoutingModule } from './connection-successful-routing.module';

import { ConnectionSuccessfulPage } from './connection-successful.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionSuccessfulPageRoutingModule
  ],
  declarations: [ConnectionSuccessfulPage]
})
export class ConnectionSuccessfulPageModule {}
