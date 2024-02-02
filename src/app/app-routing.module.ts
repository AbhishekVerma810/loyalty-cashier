import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { OuterGuard } from './guards/outer.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'business-id-page',
    pathMatch: 'full'
  },
  {
    path: 'welcome-screen',
    loadChildren: () => import('./pages/welcome-screen/welcome-screen.module').then(m => m.WelcomeScreenPageModule)
  },
  {
    path: 'cashier-login',
    canActivate: [OuterGuard],
    loadChildren: () => import('./pages/cashier-login/cashier-login.module').then(m => m.CashierLoginPageModule)
  },
  {
    path: 'code-screen',
    canActivate: [OuterGuard],
    loadChildren: () => import('./pages/code-screen/code-screen.module').then(m => m.CodeScreenPageModule)
  },
  {
    path: 'main-cashier-interface',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/main-cashier-interface/main-cashier-interface.module').then(m => m.MainCashierInterfacePageModule)
  },
  {
    path: 'end-transactione',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/end-transactione/end-transactione.module').then(m => m.EndTransactionePageModule)
  },
  {
    path: 'connection-successful',
    loadChildren: () => import('./pages/connection-successful/connection-successful.module').then(m => m.ConnectionSuccessfulPageModule)
  },
  {
    path: 'customer-login/:type',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/customer-login/customer-login.module').then( m => m.CustomerLoginPageModule)
  },
  {
    path: 'business-id-page',
    // canActivate: [OuterGuard],
    loadChildren: () => import('./pages/business-id-page/business-id-page.module').then( m => m.BusinessIdPagePageModule)
  },
  {
    path: 'customer-signup/:type',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/customer-signup/customer-signup.module').then( m => m.CustomerSignupPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
