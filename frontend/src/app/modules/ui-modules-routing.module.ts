import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { BaseComponent } from './base/pages/base/base.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { LoginAuthGuard } from './shared/guards/login-auth-guard';

const routes: Routes = [
  { path: 'auth', canActivate: [LoginAuthGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'login', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
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
            path: 'blog',
            loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
            // canActivate: [AuthGuard]
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
