import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModulesRouting } from './ui-modules-routing.module';

// SHARED MODULES //
import { SharedModule } from './shared/shared.module';
import { BaseComponent } from './base/pages/base/base.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { BlogService } from './services/blog.service';

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    UiModulesRouting,

    // SHARED MODULES //
    SharedModule
  ],
  exports: [UiModulesRouting, SharedModule],
  providers: [
    AuthenticationService,
    UserService,
    BlogService
  ]
})
export class UiModule { }
