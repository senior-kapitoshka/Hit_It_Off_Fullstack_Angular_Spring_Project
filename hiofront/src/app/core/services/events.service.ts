import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Event} from '../../app/models/event.interface'
import { EventView } from '../../app/models/event-view.interface';
import {Comment} from '../../app/models/comment.interface'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }


  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.eventsURL}`).pipe(
      tap((data: Event[]) => data),
      catchError(err => throwError(() => err))
   )
  }

  getArchive(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.eventsURL}/archive`).pipe(
      tap((data: Event[]) => data),
      catchError(err => throwError(() => err))
   )
  }


   getEventView(data: any): Observable<EventView> {

    return this.http.get<EventView>(`${environment.eventsURL}/${data.id}`).pipe(
       tap((data:{event:Event,usersPartInIds:number[],comments:Comment[]}) =>{
        return data}),
       catchError(err => throwError(() => err))
    )
   }

   getEventToEdit(data: any): Observable<Event> {

    return this.http.get<Event>(`${environment.eventsURL}/${data.id}/edit`).pipe(
       tap((data: Event) => {console.log(data);return data}),
       catchError(err => throwError(() => err))
    )
   }

   addEvent(event: Event, file: File | null): Observable<any> {
    const formData: FormData = new FormData();
  
    // Убедимся, что нет undefined
    const cleanedEvent = JSON.stringify(event, (_, value) =>
      value === undefined ? null : value
    );
  
    console.debug('[DEBUG] Cleaned Event:', cleanedEvent);
  
    formData.append('event', new Blob([cleanedEvent], { type: 'application/json' }));
  
    if (file) {
      console.debug('[DEBUG] Appending file:', file.name);
      formData.append('eventImg', file, file.name);
    }
  
    return this.http.post<any>(`${environment.eventsURL}/form`, formData).pipe(
      tap(data => console.log('Event added:', data)),
      catchError(err => {
        console.error('[HTTP Error]:', err);
        return throwError(() => err);
      })
    );
  }
  
  

  // Обновление события с изображением (метод с поддержкой файлов)
  updateEvent(id: number, event: Event, file: File |null): Observable<Event> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString()); 
    const cleanedEvent = JSON.stringify(event, (_, value) =>
      value === undefined ? null : value
    );
    console.log(file);
    formData.append('event', new Blob([cleanedEvent], { type: 'application/json' }));

    if (file) {
      console.debug('[DEBUG] Appending file:', file.name);
      formData.append('eventImg', file, file.name);
    }


    return this.http.put<Event>(`${environment.eventsURL}/${id}/edit`,formData).pipe(
      catchError(err => throwError(() => err))
    );
  }

   deleteEvent(id:number) : Observable<Event> {
    console.log(id);
    return this.http.delete<Event>(`${environment.eventsURL}/${id}/edit`)
    .pipe(
      catchError(err => throwError(() => err))
   )
  }

  subscribeUnsubscribe(id:number) : Observable<Event> {
    return this.http.patch<Event>(`${environment.eventsURL}/${id}/edit`, null)
    .pipe(
      catchError(err => throwError(() => err))
   )
  }

}
