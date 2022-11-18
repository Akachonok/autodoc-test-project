import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailInformationComponent } from './detail-information.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DetailInformationComponent,
  },
];

@NgModule({
  declarations: [DetailInformationComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DetailInformationComponent],
})
export class DetailInformationModule {}
