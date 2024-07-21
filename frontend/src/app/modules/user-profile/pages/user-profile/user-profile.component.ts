import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/services/authentication.service';
import { UserService } from 'src/app/modules/services/user.service';
import { CommonFunction } from 'src/app/modules/shared/common-function/common-function';
import { getUserDetails } from 'src/app/modules/shared/helpers/jwt.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // Public params
  profileForm: FormGroup;
  loading = false;
  errorMessage: any;
  errors: any = [];
  private unsubscribe: Subject<any>;
  currentUser: any;
  defaultProfile = '../../../../../assets/images/blank-profile-picture.png';
  imagePreview;
  isEdit = false;
  userId;
  fileObject;

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
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      username: ['', Validators.required],
    });

    let user = getUserDetails(localStorage.getItem('access_token'))['user'];
    this.userId = user.id;
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(this.userId).pipe(
      map((user: any) => {
        if (!user.profileImage) {
          this.currentUser = {
            ...user,
            profilePic: this.defaultProfile
          }
        } else {
          this.currentUser = {
            ...user,
            profilePic: `${environment.baseURL}users/profile-image/${user.profileImage}`
          }
        }
        this.formPatch();
      })
    ).subscribe();
  }

  editProfileOn() {
    this.isEdit = !this.isEdit;
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.fileObject = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;

      reader.readAsDataURL(file);
      this.currentUser.profilePic = '';
    }
  }

  formPatch() {
    this.profileForm.patchValue(this.currentUser);
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  /**
   * Form Submit
   */
  onSubmit() {
    // Check form valid
    if (this.profileForm.invalid) {
      // this.registerForm.markAsTouched();
      // this.markAsTouched();
      Object.keys(this.profileForm.controls).forEach(controlName =>
        this.profileForm.controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    // Payload
    // const payload = assign({}, formValue, 'LOGIN_CONFIG');

    // Service Call

    console.log('this.fileObject>>>>', this.fileObject);

    this.userService.updateUser(this.profileForm.value).subscribe(response => {
      console.log(response);
      if (response && this.imagePreview) {
        this.userService.uploadProfile(this.fileObject).subscribe(data => {
          this.openSnackBar('User Updated..!');
          this.getUserById();
          this.isEdit = false;
          this.loading = false;
          this.cdr.markForCheck();
        });
      } else {
        this.openSnackBar('Somthing Went Wrong..!');
        this.getUserById();
        this.isEdit = false;
        this.loading = false;
        this.cdr.markForCheck();
      }
    })

    // this.userService.updateUser(this.profileForm.value).pipe(tap(res => {
    //   if (res) {
    //     // Navigate to Dashbord.
    //     this.openSnackBar('User Updated..!');
    //     this.getUserById();
    //     this.isEdit = false;
    //   } else {
    //     // this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
    //     this.openSnackBar('Somthing Went Wrong..!');
    //     this.getUserById();
    //     this.isEdit = false;
    //   }
    // }),
    //   catchError(err => {
    //     console.log(err);
    //     if (err.error.msg_code === 114) {
    //       this.errorMessage = err;
    //     }
    //     // this.authNoticeService.setNotice(err.error.message, 'error');
    //     return of(err);
    //   }),
    //   takeUntil(this.unsubscribe),
    //   finalize(() => {
    //     this.loading = false;
    //     this.cdr.markForCheck();
    //   })
    // ).subscribe();
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
