import { NoteItem } from './noteitem';
import { FootInfoPage } from '../footinfopage/footinfopage';
import { PopOverMsg } from '../popovermsg/popovermsg';
import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';


@Component({
  templateUrl: 'notes.html',
})

export class Notes {
    items : Array<NoteItem>;

  constructor(private popoverCtrl: PopoverController) {
      this.items = [];

  }

  addItem(event) {
      this.items.push(event);
      console.log("Notes Component Add " + event);
  }
  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopOverMsg);

    popover.present({
      ev: ev
    });
  } 
}
