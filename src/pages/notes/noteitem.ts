import { NoteItemInfo } from './noteiteminfo';

export class NoteItem {
    title:string; 
    time:number;
    /* TODO
    category:string;
    gps:string;
    light:string;
    phote:string;
    meno:string;
    */
    constructor(title:string, time:number) {
        this.title = title;
        this.time = time;
        
    }
}
