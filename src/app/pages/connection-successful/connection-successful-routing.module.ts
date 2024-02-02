import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionSuccessfulPage } from './connection-successful.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectionSuccessfulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionSuccessfulPageRoutingModule {}
