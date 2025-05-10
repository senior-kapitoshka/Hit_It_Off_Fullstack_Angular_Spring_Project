import { createAction, props } from '@ngrx/store';
import {Event} from '../../app/models/event.interface'


export enum CitiesActions {
    GET_CITIES = '[City] Get Cities',
    SET_CITIES = '[City] Set Cities',
    GET_EVENTS = '[Event] Get Events',
    SET_EVENTS = '[Event] Set Events',
}

export const getCities = createAction(
    CitiesActions.GET_CITIES
  );

  export const setCities = createAction(
    CitiesActions.SET_CITIES,
    props<{ cities: string[] }>(),
    );

    export const getEvents = createAction(
      CitiesActions.GET_EVENTS,
    );    
    export const setEvents = createAction(
      CitiesActions.SET_EVENTS,
      props<{ events: ReadonlyArray<Event> }>(),
      );
    