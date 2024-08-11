import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { BlogEntriesPageble } from 'src/app/modules/model/blog-entry.interface';
import { BlogService } from 'src/app/modules/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  blogDefaultImage = '../../../../../assets/images/logo/logo-black-white.png';
  gridColumns = 4;
  dataSource: Observable<BlogEntriesPageble>;
  pageEvent: PageEvent;
  environment = environment;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource = this.blogService.getAllBlogs(1, 10);
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let limit = event.pageSize;
    page = page + 1;
    this.dataSource = this.blogService.getAllBlogs(page, limit);
  }

  navigateToAnotherPage(pageType, blogId: number) {
    this.router.navigateByUrl(`blog/view/${ blogId }`);
  }

}
