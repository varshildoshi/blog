import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './pages/view/view.component';


@NgModule({
  declarations: [
    UsersComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
