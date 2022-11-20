import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/avto-novosti',
    pathMatch: 'full',
  },
  {
    path: 'avto-novosti',
    loadChildren: () =>
      import('./components/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
  {
    path: '**',
    redirectTo: 'avto-novosti',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
