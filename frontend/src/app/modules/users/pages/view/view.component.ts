import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  userData: any;
  loading = true;
  defaultProfile = '../../../../../assets/images/blank-profile-picture.png';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(this.data.userId).pipe(
      map((user: any) => {
        if (!user.profileImage) {
          this.userData = {
            ...user,
            profilePic: this.defaultProfile
          }
        } else {
          this.userData = {
            ...user,
            profilePic: `${environment.baseURL}users/profile-image/${user.profileImage}`
          }
        }
      })
    ).subscribe();
    this.loading = false;
  }

}
