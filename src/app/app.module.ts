import { AngularFireDatabaseModule } from 'angularfire2/database/database.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { Camera } from '@ionic-native/camera'

import { MyApp } from './app.component';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { FirebaseImageStorageProvider } from '../providers/firebase-image-storage/firebase-image-storage';
import { MyShopDbProvider } from '../providers/my-shop-db/my-shop-db';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    AngularFireDatabase,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    FirebaseImageStorageProvider,
    MyShopDbProvider
  ]
})
export class AppModule {}
