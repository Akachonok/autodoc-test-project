import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cars-list',
    pathMatch: 'full',
  },
  {
    path: 'cars-list',
    loadChildren: () =>
      import('./components/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },

  {
    path: '**',
    redirectTo: 'cars-list',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
