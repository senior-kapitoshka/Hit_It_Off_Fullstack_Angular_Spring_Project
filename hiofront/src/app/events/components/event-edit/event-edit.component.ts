import { Component, OnInit } from '@angular/core';
import { EventsActions } from '../../state/events.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../app/state/app.state';
import { Store } from '@ngrx/store';
import {Event} from '../../../app/models/event.interface';
import { selectEventToEdit } from '../../state/events.selectors';

@Component({
  selector: 'app-event-edit',
  standalone:false,
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
})
export class EventEditComponent implements OnInit{
  eventToEdit: Event|null=null;
  id!:number;
  eventToUpdate$=this.store.select(selectEventToEdit());
  constructor(private actRouter: ActivatedRoute,
    private store: Store<AppState>,
    ) {
   this.id=this.actRouter.snapshot.params['id'];
 }

 ngOnInit(): void {
  this.store.dispatch({type: EventsActions.GET_EVENT_TO_EDIT, id:this.id});
}

edit(data: { payload: { event: Event, eventImg: File | null } }) {
  console.log(data.payload.eventImg)
  this.store.dispatch({
    type: EventsActions.MODIFY_EVENT_API,
    id:this.id,
    payload: data.payload
  });
}


  /*edit(data:{event: Event}) {
    this.store.dispatch({type: EventsActions.MODIFY_EVENT_API,id:this.id, payload: data.event});
        return;
  }*/

}
