import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RealtimedatabaseProvider } from '../providers/realtimedatabase/realtimedatabase';
import { IonicstorageProvider } from '../providers/ionicstorage/ionicstorage';

//Ionic Storage
import { IonicStorageModule } from '@ionic/storage';


//Authentication
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthenticationpagePage } from '../pages/authenticationpage/authenticationpage';

//Firebase Storage
import { StorageProvider } from '../providers/storage/storage';
import { ImagePicker } from '@ionic-native/image-picker';

const firebaseConfig = {
  apiKey: "AIzaSyCGIyd2f_N6f8Dio0-XwFcaLwfw-tVqN0k",
  authDomain: "sample-ionic-exemplo.firebaseapp.com",
  databaseURL: "https://sample-ionic-exemplo.firebaseio.com",
  projectId: "sample-ionic-exemplo",
  storageBucket: "sample-ionic-exemplo.appspot.com",
  messagingSenderId: "1070000864844"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthenticationpagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthenticationpagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RealtimedatabaseProvider,
    RealtimedatabaseProvider,
    IonicstorageProvider,
    AuthenticationProvider,
    GooglePlus,
    StorageProvider,
    ImagePicker
  ]
})
export class AppModule {}
