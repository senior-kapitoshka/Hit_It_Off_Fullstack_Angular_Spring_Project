import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';
//selectors allow us to retrieve slices of data in store
//used in components to get the data used in the UI
//its returned as Observable that listens to the state changes

export const selectAuthState = createFeatureSelector<AuthState>('authState')

export const selectError = () => createSelector(
    selectAuthState,
    (state: AuthState) => state.error
)
export const selectUser = () => createSelector(
    selectAuthState,
    (state: AuthState) => state.user
)