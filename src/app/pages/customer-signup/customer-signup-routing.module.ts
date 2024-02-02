import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSignupPage } from './customer-signup.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSignupPageRoutingModule {}
