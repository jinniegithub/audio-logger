import { Component, Output, EventEmitter } from '@angular/core';
import { NoteItem } from '../notes/noteitem';

@Component({
    selector: 'foot-info-page',
    templateUrl: 'footinfopage.html',
})

export class FootInfoPage {
    @Output()
    logTextInput:EventEmitter<NoteItem> = new EventEmitter();

    constructor() {
    }

    onTextInput(inputText:string) {
        this.logTextInput.emit(new NoteItem(inputText, Date.now()));
        console.log("New input text: " + inputText);
        
    }
}
