import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';

import { AuthGuard } from './_guards/index';
import { HttpClient, Util } from './_libraries/index';
import { AlertService, AuthService } from './services/index';

import { HomeModule } from './components/home/home.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    HomeModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthGuard,
    HttpClient, Util,
    AlertService, AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

