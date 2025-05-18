import { Component , OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/state/app.state';
import {Event} from '../../../app/models/event.interface'
import { EventsActions } from '../../../events/state/events.actions';
import { selectArchive, selectEvents } from '../../../events/state/events.selectors';

import { TableActions } from '../../../app/models/page-actions.enum';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-events-archive-page',
  standalone:false,
  templateUrl: './events-archive-page.component.html',
  styleUrl: './events-archive-page.component.css'
})
export class EventsArchivePageComponent implements OnInit {
  headers:{header: string, fieldName: keyof Event}[] = [
    {header: "eventName", fieldName: "eventName"},
  ];
  events: ReadonlyArray<Event> = [];
  events$ = this.store.select(selectArchive());
  notMuted:boolean;
  cookieService = inject(CookieService);

  constructor(
    private router: Router,
    private store: Store<AppState>,
    ) { 
      this.notMuted=this.cookieService.get("role")!=="ROLE_MUTED";
    }

    ngOnInit(): void {
      this.store.dispatch({type: EventsActions.GET_EVENT_ARCHIVE});
    }

    selectEvent(data: {event: Event, action: TableActions}) {
      switch(data.action) {
        case TableActions.View: {
          this.router.navigate(['events',  data.event.id]);
          return;
        }
        case TableActions.Delete: {
          this.store.dispatch({type: EventsActions.DELETE_EVENT_API, payload: data.event});
          return;
  
        }
        default: ""
      }
    }
  }



