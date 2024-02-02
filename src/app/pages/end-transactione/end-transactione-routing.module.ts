import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndTransactionePage } from './end-transactione.page';

const routes: Routes = [
  {
    path: '',
    component: EndTransactionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndTransactionePageRoutingModule {}
