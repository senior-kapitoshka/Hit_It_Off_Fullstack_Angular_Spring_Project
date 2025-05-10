import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EventsState } from './events.reducers';


export const selectEventsState = createFeatureSelector<EventsState>('eventsState')

export const selectEvents = () => createSelector(
    selectEventsState,
    (state: EventsState) => state.events
)

export const selectEventData = () => createSelector(
    selectEventsState,
    (state: EventsState) => {return state.eventView}
)

export const selectEventToEdit = () => createSelector(
    selectEventsState,
    (state: EventsState) => state.eventToEdit
)

