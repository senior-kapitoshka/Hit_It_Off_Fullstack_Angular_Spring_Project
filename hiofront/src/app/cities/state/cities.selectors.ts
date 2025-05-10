import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app/state/app.state';
import {User} from '../../app/models/user.interface'
import { CitiesState } from './cities.reducers';


export const selectCitiesState = createFeatureSelector<CitiesState>('citiesState')

export const selectCities = () => createSelector(
    selectCitiesState,
    (state: CitiesState) => state.cities
)
export const selectEventsByCity = () => createSelector(
    selectCitiesState,
    (state: CitiesState) => state.events
)

