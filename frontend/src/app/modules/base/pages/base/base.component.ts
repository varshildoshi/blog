import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private userService: UserService,
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    let user = getUserDetails(localStorage.getItem('access_token'))['user'];
    this.userId = user.id;
    this.getUserById();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.cdr.detectChanges();
    });
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
    this.router.navigate(['/auth']);
    localStorage.clear();
  }
}
