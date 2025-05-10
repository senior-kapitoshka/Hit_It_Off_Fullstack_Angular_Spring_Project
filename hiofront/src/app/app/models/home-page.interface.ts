import {Event} from './event.interface'
import { User } from './user.interface';
export interface HomePage {
    user:User;
    events:Event[];
  }