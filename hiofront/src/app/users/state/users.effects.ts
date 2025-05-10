import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {User} from '../../app/models/user.interface'
import { UsersService } from '../../core/services/users.service';
import { UsersActions } from './users.actions';
import { EMPTY, forkJoin } from 'rxjs';
import { inject } from '@angular/core';

@Injectable()
export class UsersEffects {
    constructor(
        ) {}
    private actions$=inject(Actions);
    private usersService=inject(UsersService);
    private router=inject(Router);

    getUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsersActions.GET_USER_LIST),
            mergeMap(() => this.usersService.getUsers()
              .pipe(
                map(users => {return ({ type: UsersActions.SET_USER_LIST, users })}),
                catchError(() => EMPTY)
              ))
            )
        }, {dispatch: true}
      );

        patchUser$ = createEffect(() =>{
          return this.actions$.pipe(
              ofType(UsersActions.MODIFY_USER_API),
              mergeMap((data: {type: string, id:number, payload: User}) => 
              this.usersService.patchUser(data.payload.id, data.payload)
                .pipe(
                  map(_ => ({ type: UsersActions.MODIFY_USER_STATE, user: data.payload })),
                  tap(() =>  this.router.navigate(["users"])),
                  catchError(() => EMPTY)
                ))
              )
          }, {dispatch: true})

        
    deleteUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsersActions.DELETE_USER_API),
            mergeMap((data: {type: string, payload: User}) => this.usersService.deleteUser(data.payload.id)
            .pipe(
                map(() => ({ type: UsersActions.DELETE_USER_STATE, eventId: data.payload })),
                tap(() =>  this.router.navigate(["users"])),
                catchError(() => EMPTY)
            ))
            )
        }, {dispatch: true}
    );
}