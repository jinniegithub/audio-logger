import { Component } from '@angular/core';


@Component({
  templateUrl: 'notes.html'
})
export class NoteItem {
    title:string; 
    time:string;
    constructor(title:string, time:string) {
        this.title = title;
        this.time = time;
    }
}
export class Notes {
    items : Array<NoteItem>;
  constructor() {
      this.items = [];

  }
  addItem(item:NoteItem) {
      this.items.push(item);
  }
}
