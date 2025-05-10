import {Event} from './event.interface'
import {Comment} from './comment.interface'
export interface EventView {
    event:Event;
    usersPartInIds:number[];
    comments:Comment[];
  }