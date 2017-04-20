import { NoteItemInfo } from './noteiteminfo';

export class NoteItem {
    title:string; 
    time:string;
    /* TODO
    category:string;
    gps:string;
    light:string;
    phote:string;
    meno:string;
    */
    constructor(title:string, time:string) {
        this.title = title;
        this.time = time;
        
    }
}
