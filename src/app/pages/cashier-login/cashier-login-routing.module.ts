import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashierLoginPage } from './cashier-login.page';

const routes: Routes = [
  {
    path: '',
    component: CashierLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashierLoginPageRoutingModule {}
