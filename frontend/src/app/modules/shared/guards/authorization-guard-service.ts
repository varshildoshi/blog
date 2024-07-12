// Angular
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Services
import { AuthenticationService } from '../../../state/auth/services/authentication.service';
import { GlobalStoreService } from '../../../state/global/global-store.service';
import { MessageType } from '../../../state/core/models/message-type.enum';
import { MESSAGE_CONSTANTS } from '../../../state/core/constants/message.constant';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationGuardService implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private globalStoreService: GlobalStoreService
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
                if (isAuthorized.isPlanActive) {
                    return true;
                } else {
                    this.globalStoreService.dispatchNotification({
                        actionType: '',
                        messageType: MessageType.Error,
                        message: MESSAGE_CONSTANTS.PLAN_EXPIRED,
                        extraParameters: null,
                        title: MESSAGE_CONSTANTS.PAYMENT_TITLE
                    });
                    this.router.navigate(['/plan']);
                    return true;
                }
            }
            this.router.navigate(['/auth/login']);
            return false;
        }));
    }

}
