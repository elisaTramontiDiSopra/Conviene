import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { AngularFireModule } from "angularfire2"
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCc4wpmOFvjihiU3exEBeiI6ST1bebbbBI",
  authDomain: "convienetest.firebaseapp.com",
  databaseURL: "https://convienetest.firebaseio.com",
  projectId: "convienetest",
  storageBucket: "convienetest.appspot.com",
  messagingSenderId: "1018324230887"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    AngularFireDatabase,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider
  ]
})
export class AppModule {}
