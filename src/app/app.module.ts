import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Notes } from '../pages/notes/notes';
import { FootInfoPage} from '../pages/footinfopage/footinfopage';
import { PopOverMsg} from '../pages/popovermsg/popovermsg';
import { LoginPage} from '../pages/loginpage/loginpage';
import { SignupPage} from '../pages/signuppage/signuppage';
import { NotesPersistServer } from '../providers/notes-persist-server';
import { OrderByTime } from '../pipe/order-by-time';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Notes,
    FootInfoPage,
    PopOverMsg,
    LoginPage,
    SignupPage,
	OrderByTime
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Notes,
    FootInfoPage,
    PopOverMsg,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotesPersistServer,
	OrderByTime
  ]
})
export class AppModule {}
