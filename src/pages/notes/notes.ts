import { NoteItem } from './noteitem';
import { FootInfoPage } from '../footinfopage/footinfopage';
import { PopOverMsg } from '../popovermsg/popovermsg';
import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Component({
  templateUrl: 'notes.html',
})

export class Notes {
    items : Array<NoteItem>;

  constructor(private toastCtrl: ToastController) {
      this.items = [];

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
      console.log("Notes Component Add " + event);
      this.presentToast();
  }
}
