import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  Promise<boolean> | boolean {
    return this.checkLogin();
  }
  
  private checkLogin() {
    // let loginOk = true;
    if(!this.auth.notExpired()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
