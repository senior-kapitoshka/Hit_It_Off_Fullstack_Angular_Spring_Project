import { Component, OnInit } from '@angular/core';
import {Event} from '../../../app/models/event.interface';
import { EventsActions } from '../../../events/state/events.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app/state/app.state';
import { selectEventToEdit } from '../../state/events.selectors';
//import { selectEvent } from '../../../events/state/events.selectors';

@Component({
  selector: 'app-events-form-page',
  standalone:false,
  templateUrl: './events-form-page.component.html',
  styleUrl: './events-form-page.component.css'
})
export class EventsFormPageComponent implements OnInit {
  eventToEdit$ = this.store.select(selectEventToEdit());
  event: Event | null = null;
  constructor(private router: ActivatedRoute, private store: Store<AppState>) {
  
   }

  ngOnInit(): void {

  }

  create(data: { payload: { event: Event, eventImg: File | null } }) {
    this.store.dispatch({
      type: EventsActions.ADD_EVENT_API,
      payload: data.payload
    });
  }
  
  
}
