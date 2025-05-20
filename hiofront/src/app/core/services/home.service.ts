import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {User} from '../../app/models/user.interface'
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import {Event} from '../../app/models/event.interface'
import { HomePage } from '../../app/models/home-page.interface';
import { RbacService } from './rbac.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //private homeURL = `${window.location.origin}/api/home`;

  //private userSubject = new BehaviorSubject<HomePage| null>(null);
  //user$ : Observable<HomePage | null> = this.userSubject.asObservable();
  constructor(private http: HttpClient,
    private rbac:RbacService,
    private _cookieService:CookieService) { }
   
  getDetails(): Observable<HomePage> {
    //return this.http.get<HomePage>(`${this.homeURL}`).pipe(
    return this.http.get<HomePage>(`${environment.homeURL}`).pipe(
      tap((data: HomePage) => data),
      map(userDetails=>{
       // this.userSubject.next(userDetails);
        this.rbac.setAuthenticatedUser(userDetails.user.role);
        this._cookieService.set("username",userDetails.user.username);
        this._cookieService.set("id",userDetails.user.id.toString());
        this._cookieService.set("role",userDetails.user.role);
        return userDetails;
      }),
      catchError(err => throwError(() => err))
   )
  }
  getEvents(): Observable<Event[]> {
    //return this.http.get<Event[]>(`${this.homeURL}/my-events`).pipe(
    return this.http.get<Event[]>(`${environment.homeURL}/my-events`).pipe(
      tap((data: Event[]) => data),
      catchError(err => throwError(() => err))
   )
  }
}
