import { createAction, props } from '@ngrx/store';
import {Event} from '../../app/models/event.interface'
import { EventView } from '../../app/models/event-view.interface';

export enum EventsActions {
    GET_EVENT_LIST = '[Event] Get Event list',
    GET_EVENT = '[Event] Get Event',
    SET_EVENT = '[Event] Set Event',
    GET_EVENT_TO_EDIT = '[Event] Get Event to edit',
    SET_EVENT_TO_EDIT  = '[Event] Set Event to edit',
    SET_EVENT_LIST = '[Event] Set Event list',
    ADD_EVENT_API = '[Event] Add Event (API)',
    ADD_EVENT_STATE = '[Event] Add Event (STATE)',
    MODIFY_EVENT_API = '[Event] Modify Event (API)',
  MODIFY_EVENT_STATE = '[Event] Modify Event (STATE)',

  DELETE_EVENT_API = '[Event] Delete Event (API)',
  DELETE_EVENT_STATE = '[Event] Delete Event (STATE)',

  SUBSCR_EVENT_API = '[Event] Subscr Event (API)',
  SUBSCR_EVENT_STATE = '[Event] Subscr Event (STATE)',
}

export const getEventsList = createAction(
    EventsActions.GET_EVENT_LIST,
  );
  export const getEventData = createAction(
    EventsActions.GET_EVENT,
  );

  export const getEventDataToEdit = createAction(
    EventsActions.GET_EVENT_TO_EDIT,
  );
  
  export const setEventsList = createAction(
  EventsActions.SET_EVENT_LIST,
  props<{ events: ReadonlyArray<Event> }>(),
  );

  export const setEventData = createAction(
    EventsActions.SET_EVENT,
    props<{ eventView: EventView }>(),
    );

    export const setEventDataToEdit = createAction(
      EventsActions.SET_EVENT_TO_EDIT,
      props<{ eventToEdit: Event }>(),
      );
  
   
  export const addEventsState = createAction(
    EventsActions.ADD_EVENT_STATE,
    props<{ event: Event }>()
  );

  export const addEventsApi = createAction(
    EventsActions.ADD_EVENT_API,
    props<{ event: Event }>()
  );

  export const modifyEventsState = createAction(
    EventsActions.MODIFY_EVENT_STATE,
    props<{ event: Event }>()
);

export const subscrEventsState = createAction(
  EventsActions.SUBSCR_EVENT_STATE,
  props<{ event: Event }>()
);

export const deleteEventsState = createAction(
  EventsActions.DELETE_EVENT_STATE,
props<{ eventId: string }>()
);