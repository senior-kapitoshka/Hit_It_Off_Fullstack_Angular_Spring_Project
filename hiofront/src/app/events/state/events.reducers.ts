import { createReducer, on } from '@ngrx/store';
import {Event} from '../../app/models/event.interface'
import { setEventData,setEventDataToEdit,setEventsList,addEventsState,modifyEventsState, subscrEventsState, deleteEventsState } from './events.actions';
import { EventView } from '../../app/models/event-view.interface';

export interface EventsState {
    eventToEdit:Readonly<Event>,
    events: ReadonlyArray<Event>;
    eventView:Readonly<EventView>
}

export const initialState: EventsState = {
    eventToEdit:{
      id:0,
      creatorId:0,
      city:"",
      eventName:"",
      eventDate:"",
      description:"",
      usersAmount:0,
      restrictions:false,
      restrictionsLimit:0,
      eventImg:''
      },
    events: [],
    eventView:{
      event:{
        id:0,
        creatorId:0,
        city:"",
        eventName:"",
        eventDate:"",
        description:"",
        usersAmount:0,
        restrictions:false,
        restrictionsLimit:0,
        eventImg:''
      },

      usersPartInIds:[],
      comments:[]
    }
}

export const EventsReducer = createReducer(
  initialState,
  on(setEventsList, (state, { events }) => { return {...state, events}}),

  on(setEventData, (state, { eventView }) => { return {...state, eventView}}),
  on(setEventDataToEdit, (state, { eventToEdit}) => { return {...state, eventToEdit}}),

  on(addEventsState, (state, {event}) => {
    return {...state, events: [...state.events, event]}
  }),

  on(modifyEventsState, (state, {event}) => {
    return {...state, events: state.events.map(data => data.id === event.id ? event : data)}
  }),
  on(subscrEventsState, (state, {event}) => {
    return {...state, events: state.events.map(data => data.id === event.id ? event : data)}
  }),
  on(deleteEventsState, (state, { eventId }) => {
    return {...state, events: state.events.filter(data => data.id.toString() != eventId)}
  }),
  );