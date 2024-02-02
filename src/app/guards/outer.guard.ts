import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OuterGuard implements CanActivate {
  userData: any;
  constructor(private router: Router) { 
       this.userData=localStorage.getItem('user_data');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.userData){
        console.log('real outer auth if');
        return true;
      }else{
        console.log("real outer auth else ");
        this.router.navigateByUrl('/home');
        return false;
      }
  }
}
