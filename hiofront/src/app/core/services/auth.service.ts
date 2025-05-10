import { HttpClient } from '@angular/common/http';
import { Injectable,OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { DataService } from './data.service';
import { User } from '../../app/models/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { RbacService } from './rbac.service';
import { Route, Router } from '@angular/router';
import { AuthActions } from '../../auth/state/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/state/app.state';

export interface LoginRequest {
  username: string;
  password: string;
}
export interface JoinRequest {
  username: string;
  email:string;
  password: string;
  city:string;
}
export interface UpdateRequest {
  email:string;
  city:string;
  about:string;
}

export interface AuthResponse{
  token:string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
  isLogged:boolean;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ : Observable<User | null> = this.userSubject.asObservable();
  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private dataService: DataService,
    private router:Router,private store:Store<AppState>) {

      this.isLogged=false;
     }

    ngOnInit(): void {
      this.dataService.currentState.subscribe(dataService=>this.isLogged = dataService);
    }

  join(joinRequest: JoinRequest): Observable<any> {
    return this.http.post<AuthResponse>(`${environment.baseURL}/join`, joinRequest)
    .pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error(error.error?.message || 'Registration failed. Please try again.'));
      })
    );
  }

  login(loginRequest: LoginRequest): Observable<any> {
    this.dataService.log(true);
    return this.http.post<AuthResponse>(`${environment.baseURL}/login`, loginRequest)
    .pipe(
      tap((data: any) => data),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error?.message || 'Login failed. Please try again.'));
      })
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseURL}/home/settings`).pipe(
       tap((data: User) => data),
       
       catchError(err => throwError(() => err))
    )
   }

  update(updateRequest: UpdateRequest): Observable<any> {
    return this.http.put<AuthResponse>(`${environment.homeURL}/settings`, updateRequest)
    .pipe(
      tap((data: any) => data),
    );
  }
  

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token ) {
      return false;
    }
    
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('details');
    this.userSubject.next(null);
    this.dataService.log(false);
    this.store.dispatch({type: AuthActions.LOGOUT});
    this.router.navigate(['/login']);
  }





}

