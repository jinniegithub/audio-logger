import { Component } from '@angular/core';
import { NoteItem } from './noteitem';


@Component({
  templateUrl: 'notes.html'
})

export class Notes {
    items : Array<NoteItem>;
  constructor() {
      this.items = [];

  }
  addItem() {
      this.items.push(new NoteItem('', ''));
  }
}
