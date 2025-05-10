import { createAction, props } from '@ngrx/store';
import {User} from '../../app/models/user.interface'
import {Event} from '../../app/models/event.interface'
import { HomePage } from '../../app/models/home-page.interface';

export enum HomeActions {
    GET_DETAILS = '[User] Get Details',
    SET_DETAILS = '[User] Set Details',
  GET_HOME_EVENT_LIST = '[Event] Get Home Event list',
  SET_HOME_EVENT_LIST = '[Event] Set Home Event list',
  
}

export const getDetails = createAction(
    HomeActions.GET_DETAILS,
  );

  export const setDetails = createAction(
    HomeActions.SET_DETAILS,
    props<{ details: HomePage }>(),
    );



    export const getHomeEventsList = createAction(
      HomeActions.GET_HOME_EVENT_LIST,
    );
    export const setHomeEventsList = createAction(
    HomeActions.SET_HOME_EVENT_LIST,
    props<{ homeEvents: ReadonlyArray<Event> }>(),
    );
