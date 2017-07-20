import { NoteItem } from './noteitem';
import { FootInfoPage } from '../footinfopage/footinfopage';
import { PopOverMsg } from '../popovermsg/popovermsg';
import { Component } from '@angular/core';
import { ToastController, NavController, LoadingController } from 'ionic-angular';
import { NotesPersistServer } from '../../providers/notes-persist-server';
import { UserProfile } from '../loginpage/user-profile';
import { LoginPage } from '../loginpage/loginpage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';


@Component({
  templateUrl: 'notes.html',
})

export class Notes {
    items : Array<NoteItem>;
    isSpeechAvailable : boolean;

  constructor(public nav: NavController, private speech: SpeechRecognition, private toastCtrl: ToastController, private notePersister: NotesPersistServer, public loadingCtrl: LoadingController) {
      this.items = [];
	  this.loadPage();
      this.isSpeechSupported();
  }
    isSpeechSupported() {
        this.isSpeechAvailable = false;
        this.speech.isRecognitionAvailable().then(
            (ret) => {
                this.isSpeechAvailable = ret;
            }
        );
    }

	loadPage() {
		this.notePersister.promiseToGetNoteItems().then((data)=>{
			console.log("Load All NoteItems " + JSON.stringify(data));
			this.items = <Array<NoteItem>> data;
		}).catch(error=>{
		console.log(JSON.stringify(error));
});
	}

    logout() {
        this.notePersister.logout().then(ret=>{
            console.log('Back to login page');
            this.items = [];
            this.nav.setRoot(LoginPage);
        });
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'New log was added successfully',
            duration: 3000,
            position: 'middle',
        });
        toast.present();
    } 

    addItem(event) {
        this.items.push(event);
        this.notePersister.addNoteItem(event).then(data=>{
            this.items = <Array<NoteItem>> data;
        });
        console.log("Notes Component Add " + event);
        this.presentToast();
    }
}
