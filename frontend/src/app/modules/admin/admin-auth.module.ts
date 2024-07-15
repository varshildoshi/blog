import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthLayoutComponent } from './pages/admin-auth-layout/admin-auth-layout.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminAuthLayoutComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    SharedModule
  ]
})
export class AdminAuthModule { }
