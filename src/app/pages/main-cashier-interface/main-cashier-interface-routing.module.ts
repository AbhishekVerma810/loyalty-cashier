import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainCashierInterfacePage } from './main-cashier-interface.page';

const routes: Routes = [
  {
    path: '',
    component: MainCashierInterfacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainCashierInterfacePageRoutingModule {}
