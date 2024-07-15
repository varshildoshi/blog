import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUserDetails } from 'src/app/modules/shared/helpers/jwt.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = getUserDetails(localStorage.getItem('access_token'))['user'];
    console.log(this.currentUser);
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
