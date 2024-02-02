import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userData: string;
  constructor(
    private router: Router,
  ) {
    this.userData = localStorage.getItem('user_data');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userData) {
      console.log('user data available auth guard call');
      return true;
    } else {
      console.log('user data not available auth guard call');
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
