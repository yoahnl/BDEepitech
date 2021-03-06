import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

// FireBase Module
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {FIREBASE_CONFIG} from "./app.firebase.config";


// My page
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import { HomePage } from "../pages/home/home";
import {ProfilePage} from "../pages/profile/profile";
import {Global} from "../models/global";
// My Service
import {UserInfoService} from "../services/userInfo/UserInfo.service";
import {AuthService} from "../services/userInfo/Auth.service";
import {UserPage} from "../pages/user/user";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    ProfilePage,
    UserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    ProfilePage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Global,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserInfoService,
    AuthService
  ]
})
export class AppModule {}
