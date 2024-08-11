import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// FLEX LAYOUT MODULE //
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularEditorModule } from '@kolkov/angular-editor';

// ANGULAR MATERIAL MODULES //
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    // FLEX LAYOUT MODULE //
    FlexLayoutModule,
    AngularEditorModule,
    // ANGULAR MATERIAL MODULES //
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    FlexLayoutModule,
    AngularEditorModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [
  ]
})
export class SharedModule { }
