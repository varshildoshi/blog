import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// SHARED MODULES //
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { BlogModule } from '../blog/blog.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    UsersModule,
    BlogModule
  ]
})
export class DashboardModule { }
