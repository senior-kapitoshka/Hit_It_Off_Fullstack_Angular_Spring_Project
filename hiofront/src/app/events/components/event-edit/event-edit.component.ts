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
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  eventToUpdate$=this.store.select(selectEventToEdit());
  constructor(private actRouter: ActivatedRoute,
    private store: Store<AppState>,
    ) {
   this.id=this.actRouter.snapshot.params['id'];
 }

 ngOnInit(): void {
  this.store.dispatch({type: EventsActions.GET_EVENT_TO_EDIT, id:this.id});
}

onFileSelected(event: Event & { target: HTMLInputElement }): void { 
  const input = event.target;

  if (!input.files || input.files.length === 0) return;

  this.selectedFile = input.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;
  };
  reader.readAsDataURL(this.selectedFile);
}

edit(data: { payload: { event: Event, eventImg: File | null } }) {
  console.log('Received file:', data.payload.eventImg);
  this.store.dispatch({
    type: EventsActions.MODIFY_EVENT_API,
    id: this.id,
    payload: data.payload
  });
}
}


