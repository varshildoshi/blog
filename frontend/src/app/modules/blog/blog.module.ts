import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogActionComponent } from './pages/blog-action/blog-action.component';

// SHARED MODULES //
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogActionComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  exports: [BlogListComponent]
})
export class BlogModule { }
