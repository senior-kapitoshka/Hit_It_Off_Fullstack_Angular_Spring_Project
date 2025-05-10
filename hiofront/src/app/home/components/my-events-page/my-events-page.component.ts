import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/state/app.state';
import { DataService } from '../../../core/services/data.service';
import { CommandBarActions } from '../../../events/components/events-list-page/events-list-page.component';
import { HomeActions } from '../../../home/state/home.actions';
import { selectHomeEvents } from '../../../home/state/home.selectors';

import {Event} from '../../../app/models/event.interface'
import { TableActions } from '../../../app/models/page-actions.enum';

@Component({
  selector: 'app-my-events-page',
  standalone:false,
  templateUrl: './my-events-page.component.html',
  styleUrl: './my-events-page.component.css'
})
export class MyEventsPageComponent implements OnInit {
  headers:{header: string, fieldName: keyof Event}[] = [
    {header: "eventName", fieldName: "eventName"},
  ];
  events: ReadonlyArray<Event> = [];
  events$ = this.store.select(selectHomeEvents());
 // eventsStore$ = this.store.select(selectHomeEvents());
  constructor(
    private router: Router,
    private store: Store<AppState>,
    ) { }

    ngOnInit(): void {
      this.store.dispatch({type: HomeActions.GET_HOME_EVENT_LIST});
      //this.assignEvents();
    }
  
    /*assignEvents() {
      this.eventsStore$.subscribe((data) => {
        this.events = data;
      });
    }*/

    selectEvent(data: {event: Event, action: TableActions}) {
      switch(data.action) {
        case TableActions.View: {
          this.router.navigate(['events',  data.event.id]);
          return;
        }
        /*case TableActions.Delete: {
          this.store.dispatch({type: EventsActions.REMOVE_ANTI_HERO_API, payload: data.antiHero.id});
          return;
  
        }*/
        default: ""
      }
    }

    executeCommandBarAction(action: CommandBarActions) {
      switch(action) {
        case CommandBarActions.Create: {
          this.router.navigate(["events", "form"]);
          return;
        }
        
        default: ""
  
      }
    }
}

