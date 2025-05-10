import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app/state/app.state';
import {User} from '../../app/models/user.interface'
import { HomeState } from './home.reducers';


export const selectHomeState = createFeatureSelector<HomeState>('homeState')

export const selectDetails = () => createSelector(
    selectHomeState,
    (state: HomeState) => state.details
)

export const selectHomeEvents = () => createSelector(
    selectHomeState,
    (state: HomeState) => state.homeEvents
)