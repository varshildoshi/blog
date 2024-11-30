// Angular
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Services
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        // private globalStoreService: GlobalStoreService
    ) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.checkIfAuthorized(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkIfAuthorized(childRoute, state);
    }

    checkIfAuthorized(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authenticationService.isAuthorized().pipe(map((isAuthorized: any) => {
            if (isAuthorized.isLoggedIn) {
                return false;
            }
            // this.router.navigate(['/auth/login']);
            // return false;
        }));
    }

}
