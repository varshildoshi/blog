import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];
  pageEvent: PageEvent

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService.getAllUsers(1, 10).pipe(
      map((userData: any) => this.dataSource = userData)
    ).subscribe();
  }

  onPaginateChabge(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;
    this.userService.getAllUsers(page, size).pipe(
      map((userData: any) => this.dataSource = userData)
    ).subscribe();
  }

}
