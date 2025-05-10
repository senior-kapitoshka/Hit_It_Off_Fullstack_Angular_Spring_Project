import { Component, OnInit ,Input, inject,} from '@angular/core';
import {User} from '../../../app/models/user.interface'
import {Event} from '../../../app/models/event.interface'

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/state/app.state';

import { HomeActions } from '../../state/home.actions';
import { selectDetails } from '../../state/home.selectors';

import { DataService } from '../../../core/services/data.service';
import { HomePage } from '../../../app/models/home-page.interface';
import { AuthService } from '../../../core/services/auth.service';
import { HomeService } from '../../../core/services/home.service';
import {CookieService} from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone:false,
  providers: [CookieService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  cookieService = inject(CookieService);
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private isLog: DataService,
    private home: HomeService,
    private _cookieService:CookieService
  ) { 

  }
  details!: HomePage;
  events!:Event[];
  detailsStore$ = this.store.select(selectDetails());
  upcomingEvent?:Event;

  private destroy$ = new Subject<void>();

  username!:string;
  email!:string;
  city!:string;
  about!:string;
  eventsAmount!:number;

  ngOnInit(): void {
    this.store.dispatch({type: HomeActions.GET_DETAILS});
    this.assignDetails();
  }

  assignDetails() {
    this.detailsStore$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.details = data;
      if(data){
        if(data.events) {
          this.events=data.events;
          if(data.events[0])
            this.upcomingEvent=data.events[0];
        }
      }
      
    });
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  hello():string{
    if(this.details){
      if(this.details.user){
        this.isLog.name(this.details.user.username);
        this._cookieService.set("username",this.details.user.username);
        this._cookieService.set("id",this.details.user.id.toString());
        this._cookieService.set("role",this.details.user.role);
      }
      this.isLog.setId(this.details.user.id);
      this.isLog.setRole(this.details.user.role);
      this.isLog.setEventsAmount(this.details.user.eventsAmount);
    }
    
    return this.details!==undefined?` *ੈ✩༻Hail and Welcome༺☆
        ${this.details.user.username} from ${this.details.user.city}`:
    "hello"
  }

  showUserEvents(){
    this.router.navigate(['home','my-events']);
  }

  toEvents(){
    this.router.navigate(['events']);
  }


}
