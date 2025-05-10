import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {User} from '../../app/models/user.interface'
import { HomeService } from '../../core/services/home.service';
import { HomeActions } from './home.actions';
import { EMPTY, forkJoin } from 'rxjs';
import { inject } from '@angular/core';
import {Event} from '../../app/models/event.interface'

@Injectable()
export class HomeEffects {
    constructor(
        ) {}
    private actions$=inject(Actions);
    private homeService=inject(HomeService);
    private router=inject(Router);

    getDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HomeActions.GET_DETAILS),
            mergeMap(() => this.homeService.getDetails()
              .pipe(
                map(details => {
                  
                  return({ type: HomeActions.SET_DETAILS, details })}),
                catchError(() => EMPTY)
              ))
            )
        }, {dispatch: true}
      );

      getEvents$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HomeActions.GET_HOME_EVENT_LIST),
            mergeMap(() => this.homeService.getEvents()
              .pipe(
                map(homeEvents => ({ type: HomeActions.SET_HOME_EVENT_LIST, homeEvents })),
                catchError(() => EMPTY)
              ))
            )
        }, {dispatch: true}
      );

}