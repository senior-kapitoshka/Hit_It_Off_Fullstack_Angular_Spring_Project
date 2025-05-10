import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CitiesService } from '../../core/services/cities.service';
import { CitiesActions } from './cities.actions';
import { EMPTY, forkJoin } from 'rxjs';
import { inject } from '@angular/core';
import {Event} from '../../app/models/event.interface'


@Injectable()
export class CitiesEffects {
    constructor(
        ) {}
    private actions$=inject(Actions);
    private citiesService=inject(CitiesService );
    private router=inject(Router);

    getCities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CitiesActions.GET_CITIES),
            mergeMap(() => this.citiesService.getCities()
              .pipe(
                map(cities => ({ type: CitiesActions.SET_CITIES, cities })),
                catchError(() => EMPTY)
              ))
            )
        }, {dispatch: true}
      );

      getEventsByCities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CitiesActions.GET_EVENTS),
            mergeMap((data) => this.citiesService.getEventsByCity(data)
              .pipe(
                map(events => ({ type: CitiesActions.SET_EVENTS, events })),
                catchError(() => EMPTY)
              ))
            )
        }, {dispatch: true}
      );

}