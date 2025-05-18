import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Event } from '../../app/models/event.interface';
import { EventsService } from '../../core/services/events.service';
import { EventsActions } from './events.actions';
import { EMPTY } from 'rxjs';
import { inject } from '@angular/core';

@Injectable()
export class EventsEffects {
  private actions$ = inject(Actions);
  private eventsService = inject(EventsService);
  private router = inject(Router);

  // Получить список событий
  getEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.GET_EVENT_LIST),
      mergeMap(() =>
        this.eventsService.getEvents().pipe(
          map((events) => ({
            type: EventsActions.SET_EVENT_LIST,
            events,
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  getArchive$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.GET_EVENT_ARCHIVE),
      mergeMap(() =>
        this.eventsService.getArchive().pipe(
          map((archive) => ({
            type: EventsActions.SET_EVENT_ARCHIVE,
            archive,
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  // Получить информацию о событии
  getEventView$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.GET_EVENT),
      mergeMap((data) =>
        this.eventsService.getEventView(data).pipe(
          map((eventView) => ({
            type: EventsActions.SET_EVENT,
            eventView,
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  // Получить информацию для редактирования события
  getEventToEdit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.GET_EVENT_TO_EDIT),
      mergeMap((data) =>
        this.eventsService.getEventToEdit(data).pipe(
          map((eventToEdit) => ({
            type: EventsActions.SET_EVENT_TO_EDIT,
            eventToEdit,
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  // Добавление нового события с изображением
  addEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.ADD_EVENT_API),
      mergeMap(({ payload }) => {
        const { event, eventImg } = payload;
        return this.eventsService.addEvent(event, eventImg).pipe(
          map(() => ({
            type: EventsActions.ADD_EVENT_STATE,
            event: event
          })),
          tap(() => this.router.navigate(['events'])),
          catchError(err => {
            console.error('[Effect Error]:', err);
            return EMPTY;
          })
        );
      })
    );
  });
  
  

  // Редактирование события с изображением
 modifyEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.MODIFY_EVENT_API),
      mergeMap(({id, payload }) => {
        const { event, eventImg } = payload;
        const eventId=id;

        return this.eventsService.updateEvent(eventId, event, eventImg).pipe(
          map(() => ({
            type: EventsActions.MODIFY_EVENT_STATE,
            event: event
          })),
          tap(() => this.router.navigate(['events'])),
          catchError(err => {
            console.error('[Effect Error]:', err);
            return EMPTY;
          })
          );
        })
      );
    });
  

  // Подписка и отписка от события
  subscribeUnsubscribe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.SUBSCR_EVENT_API),
      mergeMap((data: { type: string; payload: Event }) =>
        this.eventsService.subscribeUnsubscribe(data.payload.id).pipe(
          map(() => ({
            type: EventsActions.SUBSCR_EVENT_STATE,
            event: data.payload,
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  // Удаление события
  deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.DELETE_EVENT_API),
      mergeMap((data: { type: string; payload: Event }) =>
        this.eventsService.deleteEvent(data.payload.id).pipe(
          map(() => ({
            type: EventsActions.DELETE_EVENT_STATE,
            eventId: data.payload.id,
          })),
          tap(() => this.router.navigate(['events'])),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
