import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MainPageComponent } from './main-page.component';
import { AddNewsComponent } from './add-news/add-news.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./../detail-information/detail-information.module').then(
        (m) => m.DetailInformationModule
      ),
  },
];

@NgModule({
  declarations: [MainPageComponent, AddNewsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  exports: [MainPageComponent],
})
export class MainPageModule {}
