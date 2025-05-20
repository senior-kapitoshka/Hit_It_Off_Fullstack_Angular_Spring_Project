import { Injectable,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

 // private citiesURL = `${window.location.origin}/api/cities`;

  constructor(private http: HttpClient,) {

   }
   getCities(){
    return this.http.get<String[]>(`${environment.citiesURL}`).pipe(
      //return this.http.get<String[]>(`${this.citiesURL}`).pipe(
      tap((data: String[]) => data),
      catchError(err => throwError(() => err))
   )
   }
   getEventsByCity(data:any): Observable<Event[]> {
    //return this.http.get<Event[]>(`${this.citiesURL}/${data.city}`).pipe(
    return this.http.get<Event[]>(`${environment.citiesURL}/${data.city}`).pipe(
      tap((data: Event[]) => data),
      catchError(err => throwError(() => err))
   )
  }
}
