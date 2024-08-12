import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/services/authentication.service';
import { CommonFunction } from 'src/app/modules/shared/common-function/common-function';
import { MustMatchValidators, CustomValidators } from 'src/app/modules/shared/helpers/MatchValidator';
import { emailPattern } from 'src/app/modules/shared/helpers/validation.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Public params
  registerForm: FormGroup;
  hide = true;
  loading = false;
  errorMessage: any;
  errors: any = [];
  subscriptions: Subscription[] = [];
  private unsubscribe: Subject<any>;
  apiError: string = '';
  apiMessage: string = '';

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
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern())]],
      password: ['', [Validators.required, CustomValidators.passwordContainsNumber]],
      confirmPassword: ['', [Validators.required, CustomValidators.passwordContainsNumber]],
    }, {
      validator: MustMatchValidators('password', 'confirmPassword')
    });
  }

  /**
   * Go to login page
   */
  goToLogin() {
    this.router.navigateByUrl('auth/login');
  }

  /**
   * Form Submit
   */
  onSubmit() {
    // Check form valid
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(controlName =>
        this.registerForm.controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    // Payload
    // const payload = assign({}, formValue, 'LOGIN_CONFIG');

    // Service Call
    this.authService.register(this.registerForm.value).pipe(tap(res => {
      if (res) {
        // Navigate to Dashbord.
        this.router.navigate(['/auth/login']);
      } else {
        // this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
      }
    }),
      catchError(err => {
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
   * On destroy
   */
  ngOnDestroy(): void {
    // this.authNoticeService.setNotice(null);
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
    this.loading = false;
  }

}
