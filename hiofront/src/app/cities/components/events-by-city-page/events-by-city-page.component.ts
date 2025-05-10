import { Component , OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/state/app.state';
import {Event} from '../../../app/models/event.interface'
import { CitiesActions } from '../../state/cities.actions';
import { selectEventsByCity  } from '../../state/cities.selectors';

import { DataService } from '../../../core/services/data.service';

export enum TableActions {
  View,
  Delete
}

@Component({
  selector: 'app-events-by-city-page',
  standalone:false,
  templateUrl: './events-by-city-page.component.html',
  styleUrl: './events-by-city-page.component.css'
})
export class EventsByCityPageComponent implements OnInit{

  headers:{header: string, fieldName: keyof Event}[] = [
    {header: "eventName", fieldName: "eventName"},
  ];
  city!:String;
  events: ReadonlyArray<Event> = [];
  //citiesStore$ = this.store.select(selectEventsByCity());
  cityEvents$ = this.store.select(selectEventsByCity());
  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private store: Store<AppState>,
    ) { 
      this.city=this.actRouter.snapshot.params['city'];
    }

    ngOnInit(): void {
      this.store.dispatch({type: CitiesActions.GET_EVENTS,city:this.city});
      //this.assignEvents();
    }
  
    /*assignEvents() {
      this.citiesStore$.subscribe((data) => {
        this.events = data;
      });
    }*/

    selectEvent(data: {event: Event, action: TableActions}) {
      switch(data.action) {
        case TableActions.View: {
          this.router.navigate(['events',  data.event.id]);
          return;
        }
      }
    }

}


