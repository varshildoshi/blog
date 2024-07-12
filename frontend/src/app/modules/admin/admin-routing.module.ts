import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./admin-auth/admin-auth.module').then(m => m.AdminAuthModule),
    // canActivate: [AdminLoginAuthorizationGuardService]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
