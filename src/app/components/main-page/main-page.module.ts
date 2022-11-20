import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule, Routes } from '@angular/router';

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
  declarations: [MainPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [MainPageComponent],
})
export class MainPageModule {}