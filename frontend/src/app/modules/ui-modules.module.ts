import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModulesRouting } from './ui-modules-routing.module';

// SHARED MODULES //
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UiModulesRouting,

    // SHARED MODULES //
    SharedModule
  ],
  exports: [UiModulesRouting, SharedModule]
})
export class UiModule { }
