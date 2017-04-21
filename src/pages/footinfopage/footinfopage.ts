import { Component, Output, EventEmitter } from '@angular/core';
import { NoteItem } from '../notes/noteitem';

@Component({
    selector: 'foot-info-page',
    templateUrl: 'footinfopage.html',
})

export class FootInfoPage {
    @Output()
    textInput:EventEmitter<NoteItem> = new EventEmitter();

    constructor() {
    }

    onTextInput(inputText:string) {
        this.textInput.emit(new NoteItem(inputText, 'time'));
    }
}
