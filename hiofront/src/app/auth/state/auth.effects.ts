import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService, LoginRequest,JoinRequest,UpdateRequest } from '../../core/services/auth.service';
import { AuthActions } from './auth.actions';
import { inject } from '@angular/core';

import { HomeService  } from '../../core/services/home.service';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../core/services/data.service';
import { User } from '../../app/models/user.interface';
//using effect we can isolate components from interacting with ext. sources
//and reduce their responsibilities
 
///////////////////////////////
//For @Injectable classes, use the inject() function
//////////////////////////////
@Injectable()
export class AuthEffects {
    
  private actions$=inject(Actions);
  private authService=inject(AuthService);
    private router=inject(Router);
    private userSubject = new BehaviorSubject<User | null>(null);
    cookieService = inject(CookieService);

    constructor(private dataService: DataService,
      ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        mergeMap(((data: {type: string, payload: LoginRequest}) => this.authService.login(data.payload)
          .pipe(
            map(data => ({ type: AuthActions.SET_TOKEN, jwtToken: data.token })),
            tap(() =>  this.router.navigate(["home"])),
            catchError(async (data) => ({ type: AuthActions.LOGIN_ERROR, error: data.error }))
          ))
        ))
    }, {dispatch: true}
  );
  
  createUser$ = createEffect(
    () => {
    return this.actions$.pipe(
        ofType(AuthActions.CREATE_USER),
        mergeMap(((data: {type: string, payload: JoinRequest}) => this.authService.join(data.payload)
          .pipe(
            //
            map(data => ({ type: AuthActions.SET_TOKEN, jwtToken: data.token })),
             //
            tap(() =>  this.router.navigate(["/"])),
            catchError(async (data) => ({ type: AuthActions.LOGIN_ERROR, error: data.error }))
          ))
        ))
    }, {dispatch: true}
  ); 

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthActions.GET_USER),
        mergeMap((data) => this.authService.getUser()
          .pipe(
            map(user => ({ type: AuthActions.SET_USER, user })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );

  updateUser$ = createEffect(
    () => {
      console.log("update")
    return this.actions$.pipe(
        ofType(AuthActions.UPDATE),
        mergeMap(((data: {type: string, payload: UpdateRequest}) => this.authService.update(data.payload)
          .pipe(
            catchError(async (data) => ({ type: AuthActions.LOGIN_ERROR, error: data.error }))
          ))
        ))
    }, {dispatch: false}
  ); 

  /*logout$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthActions.LOGOUT))
    }, {dispatch: true}
  );
  Ты указал { dispatch: true }, но не возвращаешь никакое действие. Это ошибка, потому что createEffect с dispatch: true требует, чтобы Observable возвращал хотя бы одно действие.

Это приведёт к молчаливой ошибке или зависанию в работе @ngrx/effects.
  */

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.clear(); // или что угодно
      this.cookieService.deleteAll();
      
    })
  ),
  { dispatch: false } // 👈 обязательно!
);

}