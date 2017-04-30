import {Pipe, PipeTransform} from '@angular/core';
import { NoteItem } from '../pages/notes/noteitem';

@Pipe({ name: 'orderByTime' })
export class OrderByTime implements PipeTransform{
   transform(items: NoteItem [] ){
    if(items === undefined){return null;}
    return items.sort((a, b) => {
      if (a.time > b.time) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      return 0;
    });
  }
}

