import { HttpErrorResponse, HttpInterceptor } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { catchError, finalize, Observable, of } from "rxjs";
import { ERROR_CODE } from "./auth-interceptor.constant";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  intercept(req, next) {
    let authservice = this.injector.get(AuthenticationService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authservice.getToken()}`,
      },
    });
    return next.handle(tokenizedReq).pipe(
      catchError((error, caught) => {
        this.handleAuthError(error);
        return of(error);
      })
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    switch (err.status) {
      case ERROR_CODE.ERROR_401:
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        break;
    }
    this.openSnackBar(`${err.error.message}! Please login. Session is expired..`);
    throw err;
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
