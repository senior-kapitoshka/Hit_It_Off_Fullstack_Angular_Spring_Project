import { createAction, props } from '@ngrx/store';
import {User} from '../../app/models/user.interface'

export enum UsersActions {
    GET_USER_LIST = '[User] Get User list',
    SET_USER_LIST = '[User] Set User list',
  
    MODIFY_USER_API = '[User] Modify User (API)',
  MODIFY_USER_STATE = '[User] Modify User (STATE)',

  DELETE_USER_API = '[User] Delete User (API)',
  DELETE_USER_STATE = '[User] Delete User (STATE)',
}

export const getUsersList = createAction(
    UsersActions.GET_USER_LIST,
  );



  export const setUsersList = createAction(
  UsersActions.SET_USER_LIST,
  props<{ users: ReadonlyArray<User> }>(),
  );



  export const modifyUsersState = createAction(
    UsersActions.MODIFY_USER_STATE,
    props<{ user: User }>()
);


export const deleteUsersState = createAction(
  UsersActions.DELETE_USER_STATE,
props<{ userId: string }>()
);