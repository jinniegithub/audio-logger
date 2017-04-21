import { Component } from '@angular/core';
import { NoteItem } from './noteitem';
import { FootInfoPage } from '../footinfopage/footinfopage';

@Component({
  templateUrl: 'notes.html',
})

export class Notes {
    items : Array<NoteItem>;
  constructor() {
      this.items = [];

  }

  addItem(event) {
      this.items.push(event);
      console.log("Notes Component Add " + event);
  }
}
