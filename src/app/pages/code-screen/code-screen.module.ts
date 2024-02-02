import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { CodeScreenPageRoutingModule } from './code-screen-routing.module';

import { CodeScreenPage } from './code-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeScreenPageRoutingModule
  ],
  providers: [StorageService],
  declarations: [CodeScreenPage]
})
export class CodeScreenPageModule {}
