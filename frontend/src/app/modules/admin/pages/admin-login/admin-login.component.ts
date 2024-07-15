// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Subscription, of, Subject } from 'rxjs';
import { finalize, takeUntil, tap, catchError } from 'rxjs/operators';
import { CommonFunction } from 'src/app/modules/shared/common-function/common-function';
// Lodash
import { assign } from 'lodash';
import { emailPattern } from 'src/app/modules/shared/helpers/validation.helper';
import { AuthenticationService } from 'src/app/modules/services/authentication.service';
import { CustomValidators } from 'src/app/modules/shared/helpers/MatchValidator';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {

  // Public params
  loginForm: FormGroup;
  hide = true;
  loading = false;
  errorMessage: any;
  errors: any = [];
  subscriptions: Subscription[] = [];
  private unsubscribe: Subject<any>;

  /**
   * Component constructor
   *
   * @param router: Router
   * @param store: Store<AppState>
   * @param cdr: cdr
   * @param route: route
   */
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    public commonFunction: CommonFunction,
    public fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern())]],
      password: ['', [Validators.required, CustomValidators.passwordContainsNumber]],
    });
  }

  /**
   * Go to register page
   */
  goToRegister() {
    this.router.navigateByUrl('auth/register');
  }

  /**
   * Form Submit
   */
  onSubmit() {
    // Check form valid
    if (this.loginForm.invalid) {
      // this.loginForm.markAsTouched();
      // this.markAsTouched();
      Object.keys(this.loginForm.controls).forEach(controlName =>
        this.loginForm.controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    // Payload
    // const payload = assign({}, formValue, 'LOGIN_CONFIG');

    // Service Call
    this.authService.login(this.loginForm.value).pipe(tap(res => {
      console.log(res);
      if (res) {
        // Navigate to Dashbord.
        this.router.navigate(['/dashboard']);
      } else {
        // this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
      }
    }),
      catchError(err => {
        console.log(err);
        if (err.error.msg_code === 114) {
          this.errorMessage = err;
        }
        // this.authNoticeService.setNotice(err.error.message, 'error');
        return of(err);
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    ).subscribe();
  }


  /**
   * Marks all controls in a form group as touched
   */
  markAsTouched() {
    const controls = this.loginForm.controls;
    Object.keys(controls).forEach(controlName =>
      controls[controlName].markAllAsTouched()
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // this.authNoticeService.setNotice(null);
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
    this.loading = false;
  }

}
