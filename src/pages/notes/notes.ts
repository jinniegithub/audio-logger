import { NoteItem } from './noteitem';
import { FootInfoPage } from '../footinfopage/footinfopage';
import { PopOverMsg } from '../popovermsg/popovermsg';
import { Component } from '@angular/core';
import { ToastController, NavController, LoadingController } from 'ionic-angular';
import { NotesPersistServer } from '../../providers/notes-persist-server';
import { UserProfile } from '../loginpage/user-profile';
import { LoginPage } from '../loginpage/loginpage';


@Component({
  templateUrl: 'notes.html',
})

export class Notes {
    items : Array<NoteItem>;

  constructor(public nav: NavController, private toastCtrl: ToastController, private notePersister: NotesPersistServer, public loadingCtrl: LoadingController) {
      this.items = [];
	  this.loadPage();
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
        this.notePersister.addNoteItem(event);
        console.log("Notes Component Add " + event);
        this.presentToast();
    }
}
