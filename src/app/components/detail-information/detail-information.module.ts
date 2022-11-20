import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailInformationComponent } from './detail-information.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
