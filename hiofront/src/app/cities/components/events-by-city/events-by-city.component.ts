
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Event} from '../../../app/models/event.interface'

export enum TableActions {
  View,
  Delete
}

@Component({
  selector: 'app-events-by-city',
  standalone:false,
  templateUrl: './events-by-city.component.html',
  styleUrl: './events-by-city.component.css'
})
export class EventsByCityComponent implements OnInit {
  @Input() headers: Array<{header: string, fieldName: keyof Event}> = [];
  @Input() events: ReadonlyArray<Event> = [];
  @Output() event = new EventEmitter<{event: Event, action :TableActions}>();
  eventNamesFields: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields() {
    this.eventNamesFields = this.headers.map((data) => data.fieldName);
    this.eventNamesFields.push("actions");
  }

  selectEvent(event: Event, action: TableActions) {
    this.event.emit({event, action});
  }
}



