import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../app/models/user.interface';

//actions just simple interfaces
//they are directly called in components using dispatch() 

export enum AuthActions {
 LOGIN = '[AUTH] Login',
 UPDATE= '[AUTH] Update',
 SET_TOKEN = '[AUTH] Set Token',
 CREATE_USER = '[AUTH] Create User',
 LOGIN_ERROR = '[AUTH] LOGIN_ERROR',

 GET_USER='[AUTH] Get User',

    SET_USER='[AUTH] Set User',
    LOGOUT='[AUTH] Logout'
}


export const getUser = createAction(
    AuthActions.GET_USER,
  );

  export const setUser = createAction(
    AuthActions.SET_USER,
    props<{ user: User }>(),
  );  

export const loginUser = createAction(
    AuthActions.LOGIN, 
    props<{ username: string, password: string }>()
);

export const updateUser = createAction(
    AuthActions.UPDATE, 
    props<{ email: string, city: string, about: string }>()
);


export const setToken = createAction(
    AuthActions.SET_TOKEN,
    props<{ jwtToken: string }>(),
);

    

export const setError = createAction(
    AuthActions.LOGIN_ERROR,
    props<{ error: any }>(),
);

export const Logout = createAction(AuthActions.LOGOUT);