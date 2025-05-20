import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
//import { environment } from '../../../environments/environment';
import { User } from '../../app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private usersURL = `${window.location.origin}/api/users`; 

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersURL}`).pipe(
    //return this.http.get<User[]>(`${environment.usersURL}`).pipe(
      tap((data: User[]) => {console.log(data);return data}),
      catchError(err => throwError(() => err))
   )
  }


  patchUser(id:number, user: User) : Observable<User> {
    return this.http.patch<User>(`${this.usersURL}/${id}`, user)
    //return this.http.patch<User>(`${environment.usersURL}/${id}`, user)
    .pipe(
      catchError(err => throwError(() => err))
   )
  }

   deleteUser(id:number) : Observable<User> {
    return this.http.delete<User>(`${this.usersURL}/${id}`)
    //return this.http.delete<User>(`${environment.usersURL}/${id}`)
    .pipe(
      catchError(err => throwError(() => err))
   )
  }
}
