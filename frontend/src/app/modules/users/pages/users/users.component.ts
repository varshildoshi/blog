import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs';
import { UserService } from 'src/app/modules/services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role', 'actions'];
  pageEvent: PageEvent;
  filterValue: string = null;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService.getAllUsers(1, 10).pipe(
      map((userData: any) => this.dataSource = userData)
    ).subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (this.filterValue === null) {
      page = page + 1;
      this.userService.getAllUsers(page, size).pipe(
        map((userData: any) => this.dataSource = userData)
      ).subscribe();
    } else {
      this.userService.getUsersBySearchFilter(page, size, this.filterValue).pipe(
        map((userData: any) => this.dataSource = userData)
      ).subscribe();
    }

  }

  applyFilter(username: string) {
    this.userService.getUsersBySearchFilter(0, 10, username).pipe(
      map((userData: any) => this.dataSource = userData)
    ).subscribe();
  }

  openDialog(id) {
    this.dialog.open(ViewComponent, {
      data: {
        userId: id,
      },
      width: '500px',
      height: '300px'
    });
  }

}
