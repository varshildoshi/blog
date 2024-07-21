import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/modules/services/user.service';
import { getUserDetails } from 'src/app/modules/shared/helpers/jwt.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  currentUser: any;
  userId;
  defaultProfile = '../../../../../assets/images/blank-profile-picture.png';

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
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
      })
    ).subscribe();
  }

  navigateToRoute(route) {
    this.router.navigate(['../', route]);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
