import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/pages/base/base.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { LoginAuthGuard } from './shared/guards/login-auth-guard';
import { AdminLoginAuthGuard } from './shared/guards/admin-login-auth-guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [LoginAuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'login', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'admin', canActivate: [AdminLoginAuthGuard], loadChildren: () => import('./admin/admin-auth.module').then(m => m.AdminAuthModule) },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    children: [
      {
        path: '',
        component: BaseComponent,
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard],
            canActivateChild: [AuthGuard]
          },
          {
            path: 'users',
            loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            canActivate: [AuthGuard],
            canActivateChild: [AuthGuard]
          },
          {
            path: 'user-profile',
            loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
            canActivate: [AuthGuard],
            canActivateChild: [AuthGuard]
          },
          {
            path: 'blog',
            loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
            canActivate: [AuthGuard],
            canActivateChild: [AuthGuard]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class UiModulesRouting { }
