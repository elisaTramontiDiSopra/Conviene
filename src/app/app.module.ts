import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from "angularfire2"
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"

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
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    AngularFireDatabase,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
