import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogActionComponent } from './pages/blog-action/blog-action.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'add', component: BlogActionComponent, data: { pageType: 'add' } },
  { path: 'view/:id', component: BlogActionComponent, data: { pageType: 'view' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
