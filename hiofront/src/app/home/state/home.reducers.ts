import { createReducer, on } from '@ngrx/store';
import {User} from '../../app/models/user.interface'
import { setDetails, setHomeEventsList} from './home.actions';
import {Event} from '../../app/models/event.interface'
import { HomePage } from '../../app/models/home-page.interface';
import {Logout} from '../../auth/state/auth.actions';
import { Roles } from '../../app/models/roles.enum';
export interface HomeState {
    details: HomePage;
    homeEvents: ReadonlyArray<Event>;
}

export const initialState: HomeState = {
    details:  {user:
        {id:0,username:'', email:'', city:'', about:'', eventsAmount:0,
        /*role:{
            id: 0,
            username: '',
            uid: 'ROLE_USER'
          }*/
          role:''
        },
            events:[]
    },
    homeEvents:[]
}

export const HomeReducer = createReducer(
  initialState,
  on(setDetails, (state, { details }) => { return {...state,details}}),
  on(setHomeEventsList, (state, { homeEvents }) => { return {...state, homeEvents}}),
  on(Logout,()=> ({...initialState,})),
  );