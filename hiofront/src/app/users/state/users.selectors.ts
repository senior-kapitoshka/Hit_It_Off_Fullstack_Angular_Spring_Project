import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UsersState } from './users.reducers';


export const selectUsersState = createFeatureSelector<UsersState>('usersState')

export const selectUsers = () => createSelector(
    selectUsersState,
    (state: UsersState) => {return state.users}
)


