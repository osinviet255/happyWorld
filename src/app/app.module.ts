import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Controller } from './BSL/controller';
import { Entities } from './entities/Entities';
import { common } from './BSL/common';

import { HttpClientModule } from '@angular/common/http';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { CurrencyPipe } from '@angular/common';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Controller,
    Entities,
    common,
    FirebaseX,
    FirebaseAuthentication,
    CurrencyPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
