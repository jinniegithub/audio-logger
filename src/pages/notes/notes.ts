import { NoteItem } from './noteitem';
import { FootInfoPage } from '../footinfopage/footinfopage';
import { PopOverMsg } from '../popovermsg/popovermsg';
import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NotesPersistServer } from '../../providers/notes-persist-server';
import { UserProfile } from '../loginpage/user-profile';


@Component({
  templateUrl: 'notes.html',
})

export class Notes {
    items : Array<NoteItem>;

  constructor(private toastCtrl: ToastController, private notePersister: NotesPersistServer) {
      this.items = [];
	  this.loadPage();
  }

	loadPage() {
		this.notePersister.promiseToGetNoteItems().then((data)=>{
			console.log("All NoteItems " + JSON.stringify(data));
			this.items = <Array<NoteItem>> data;
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
