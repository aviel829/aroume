import { SQLite } from '@ionic-native/sqlite';
import { ResetPasswordPage } from './../pages/reset-password/reset-password';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from "../pages/settings/settings";
import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
import { ModalMgtPage } from '../pages/modal-mgt/modal-mgt';
import { RentItemPage } from "../pages/week-sales/week-sales";
import { MyItemsPage } from "../pages/month-sales/month-sales";
// import { StatsPage } from "../pages/stats/stats";
import { PopOverPage } from "../pages/pop-over/pop-over";
import { LoginPage } from "..//pages/login/login";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { AroundMeServiceProvider } from '../providers/AroundMe-service/AroundMe-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { PrefServiceProvider } from '../providers/pref-service/pref-service';

import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { IonPullupModule } from 'ionic-pullup';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyAUhfgTvM3VmYyHeWQpqmhWB-p-RF_fC4I",
  authDomain: "aroundme-3b06c.firebaseapp.com",
  databaseURL: "https://aroundme-3b06c.firebaseio.com/",
  projectId: "aroundme-3b06c",
  storageBucket: "aroundme-3b06c.appspot.com",
  messagingSenderId: "43282998367"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    // ContactPage,
    LoginPage,
    HomePage,
    // TabsPage,
    ModalMgtPage,
    SettingsPage,
    RentItemPage,
    MyItemsPage,
    // StatsPage,
    PopOverPage,
    ResetPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    // IonicStorageModule.forRoot({
    //   name: '__AroundMeDB',
    //   driverOrder: ['indexeddb', 'sqlite', 'websql']
    // }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonPullupModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    // ContactPage,
    HomePage,
    // TabsPage,
    ModalMgtPage,
    SettingsPage,
    RentItemPage,
    MyItemsPage,
    // StatsPage,
    LoginPage,
    PopOverPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AroundMeServiceProvider,
    StorageServiceProvider,
    PrefServiceProvider,
    AuthProvider,
    SQLite
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
