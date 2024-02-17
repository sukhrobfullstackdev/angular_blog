import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let res = this.authService.isAuthenticated();
    if (res) return res;
    this.authService.logout();
    this.router.navigate(['/admin', 'login'], {
      queryParams: {
        loginAgain: true
      }
    });
    return res;
  }
}
