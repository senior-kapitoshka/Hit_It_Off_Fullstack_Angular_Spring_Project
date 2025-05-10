import { createReducer, on } from '@ngrx/store';

import { User } from '../../app/models/user.interface';
import { deleteUsersState, modifyUsersState, setUsersList } from './users.actions';

export interface UsersState {
   users: ReadonlyArray<User>;
}

export const initialState: UsersState = {

    users: [],
}

export const UsersReducer = createReducer(
  initialState,
  on(setUsersList, (state, { users }) => { return {...state,users}}),


  on(modifyUsersState, (state, {user}) => {
    return {...state, users: state.users.map(data => data.id === user.id ? user : data)}
  }),

  on(deleteUsersState, (state, { userId }) => {
    return {...state, users: state.users.filter(data => data.id.toString() != userId)}
  }),
  );