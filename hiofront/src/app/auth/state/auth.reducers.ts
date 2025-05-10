import { createReducer, on } from '@ngrx/store';
import { Logout, setError, setToken,setUser} from './auth.actions';
import { User } from '../../app/models/user.interface';

//reducers decide which actions to handle based on the action type
//reducers can change the value of the state

export interface AuthState {
    jwtToken: string;
    error: any
    user:User
}

export const initialState: AuthState = {
    jwtToken: "",
    user:{id:0,
        username:"",
        email:"",
        city:"",
        about:"",
        eventsAmount:0,
        /*role:{
            id: 0,
            username: '',
            uid: 'ROLE_USER'
          }*/
          role:''
    },
    error: null
}



export const authReducer = createReducer(
  initialState,
  on(setToken, (state, { jwtToken }) => { return {...state, jwtToken}}),
  on(setError, (state, { error }) => { return {...state, error}}),
  on(setUser, (state, { user }) => { return {...state, user}}),
  on(Logout, () => ({ ...initialState })) 
  );
