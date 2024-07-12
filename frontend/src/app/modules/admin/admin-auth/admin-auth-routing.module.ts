// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Child
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminAuthLayoutComponent } from './pages/admin-auth-layout/admin-auth-layout.component';

const routes: Routes = [
  {
    path: '', component: AdminAuthLayoutComponent,
    children: [
      { path: '', component: AdminLoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }
