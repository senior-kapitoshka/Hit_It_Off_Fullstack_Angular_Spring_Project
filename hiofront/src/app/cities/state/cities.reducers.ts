import { createReducer, on } from '@ngrx/store';
import { setCities,setEvents} from './cities.actions';
import {Event} from '../../app/models/event.interface'


export interface CitiesState {
    cities:string[];
    events: ReadonlyArray<Event>;
}

export const initialState: CitiesState = {
    cities:[],
    events: []
}

export const CitiesReducer = createReducer(
  initialState,
  on(setCities, (state, { cities }) => { return {...state,cities}}),

  on(setEvents, (state, { events }) => { return {...state, events}}),

  );