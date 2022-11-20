import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DetailInformationComponent } from './detail-information.component';

const routes: Routes = [
  {
    path: '',
    component: DetailInformationComponent,
  },
];

@NgModule({
  declarations: [DetailInformationComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  exports: [DetailInformationComponent],
})
export class DetailInformationModule {}
