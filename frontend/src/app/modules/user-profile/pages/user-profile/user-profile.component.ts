import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/services/authentication.service';
import { UserService } from 'src/app/modules/services/user.service';
import { CommonFunction } from 'src/app/modules/shared/common-function/common-function';
import { getUserDetails } from 'src/app/modules/shared/helpers/jwt.helper';
import { environment } from 'src/environments/environment';

export interface File {
  data: any,
  progress: number,
  inProgress: boolean
}

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
  userId;

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  }

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
      email: [''],
      role: [''],
      profilePic: ['']
    });

    let user = getUserDetails(localStorage.getItem('access_token'))['user'];
    this.userId = user.id;
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(this.userId).pipe(
      map((user: any) => {
        this.profileForm.patchValue({
          ...user,
          profilePic: user.profileImage ? `${environment.baseURL}users/profile-image/${user.profileImage}` : this.defaultProfile
        })
      })
    ).subscribe();
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0
      }
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData;
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.userService.uploadProfile(formData).pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed');
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          this.profileForm.patchValue({ profilePic: `${environment.baseURL}users/profile-image/${event.body.profileImage}` });
        }
      });
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
      Object.keys(this.profileForm.controls).forEach(controlName =>
        this.profileForm.controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    let payload: any = {};
    payload.email = this.profileForm.value.email;
    payload.id = this.profileForm.value.id;
    payload.name = this.profileForm.value.name;
    payload.username = this.profileForm.value.username;
    // Service Call
    this.userService.updateUser(payload).subscribe(response => {
      if (response) {
        this.openSnackBar('User Updated..!');
        this.getUserById();
        this.loading = false;
        this.cdr.markForCheck();
      } else {
        this.openSnackBar('Somthing Went Wrong..!');
        this.getUserById();
        this.loading = false;
        this.cdr.markForCheck();
      }
    })
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
