import { Component , OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/state/app.state';
import {Event} from '../../../app/models/event.interface'
import { EventsActions } from '../../../events/state/events.actions';
import {  selectEventData } from '../../../events/state/events.selectors';
import { DataService } from '../../../core/services/data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { TableActions } from '../../../app/models/page-actions.enum';

import { EventView } from '../../../app/models/event-view.interface';
import {Comment} from '../../../app/models/comment.interface'

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-event-view-page',
  standalone:false,
  templateUrl: './event-view-page.component.html',
  styleUrl: './event-view-page.component.css'
})
export class EventViewPageComponent implements OnInit {
  headers:{header: string, fieldName: keyof Event}[] = [
    {header: "id", fieldName: "id"},
    {header: "creatorId", fieldName: "creatorId"},
    {header: "city", fieldName: "city"},
    {header: "eventName", fieldName: "eventName"},
    {header: "description", fieldName: "description"},
    {header: "usersAmount", fieldName: "usersAmount"},
    {header: "restrictions", fieldName: "restrictions"},
    {header: "restrictionsLimit", fieldName: "restrictionsLimit"},
  ];
  id:number;
  creatorId!:number;
  eventView_: EventView|null=null;
  event_: Readonly<Event>|null=null;
  comments:Comment[] =[];
  comment:Comment|null=null;
  isSubscr!:boolean;
  inParty!:number;
  currentUserId!:number;
  usersPartInIds:number[]|null=null;
  notMuted:boolean=true;
  eventIsOver = false;
  eventStore$=this.store.select(selectEventData());

  //импортируем объект сабскрипшион 
  private subscription = new Subscription();
  cookieService = inject(CookieService);
     constructor(private actRouter: ActivatedRoute,
       private store: Store<AppState>,
       private router: Router,
       private dataService:DataService,
       ) {
        this.notMuted=this.cookieService.get("role")!=='ROLE_MUTED';
        

      this.id=this.actRouter.snapshot.params['id'];
    }



    ngOnInit(): void {
      this.store.dispatch({type: EventsActions.GET_EVENT, id:this.id});
      this.assignEvent();
     const id= this.dataService.currentId.subscribe(id=>{
        if(id!=null)this.currentUserId = id?id:parseInt(this.cookieService.get("id"));
      });
      this.subscription.add(id);
    }
  
    assignEvent() {
      const sub = this.eventStore$.subscribe((eventView: EventView) => {
        if (eventView) {
          if (eventView.event) {
            this.event_ = eventView.event;
            this.inParty = eventView.event.usersAmount;
    
            // Проверка: прошло ли событие
            const now = new Date();
            const eventDate = new Date(eventView.event.eventDate); // предполагаем, что поле называется date
            this.eventIsOver = eventDate < now;
          }
    
          if (eventView.event) this.creatorId = eventView.event.creatorId;
          if (eventView.comments) this.comments = eventView.comments;
          if (eventView.usersPartInIds) {
            this.isSubscr = eventView.usersPartInIds.includes(this.currentUserId);
          }
        }
      });
      //добавляем подписку
      this.subscription.add(sub);
    }
    //отписываемся вручную чтобы не было утечек памяти
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }


    subscribe(){
      this.isSubscr=!this.isSubscr
      if(this.isSubscr){
        ++this.inParty;
      }
      else {
        --this.inParty;
      }
      this.store.dispatch({type: EventsActions.SUBSCR_EVENT_API, payload: this.event_})
    }
    
    selectEvent(data: {event: Event, action: TableActions}) {
      switch(data.action) {
        case TableActions.Edit : {
          this.router.navigate(['events',this.id,'edit']);

          return;
        }
        case TableActions.Delete : {
          this.store.dispatch({type: EventsActions.DELETE_EVENT_API, payload: data.event});
          return;
        }

  
        default: ""
      }
    }

}
