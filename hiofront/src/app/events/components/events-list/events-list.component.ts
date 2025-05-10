import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {Event} from '../../../app/models/event.interface'
import { TableActions } from '../../../app/models/page-actions.enum';


@Component({
  selector: 'app-events-list',
  standalone:false,
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit,OnChanges {
  @Input() headers: Array<{header: string, fieldName: keyof Event}> = [];
  @Input() events: ReadonlyArray<Event> = [];
  @Output() event = new EventEmitter<{event: Event, action :TableActions}>();
  eventNamesFields: string[] = [];

  currentPage = 1;
  itemsPerPage = 5; 
  paginatedEvents:Event[] = []; 
  totalPages = 1;
  pages:number[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getHeaderFields();
  }

  ngOnChanges(){
    this.updatePagination();
  }

  getHeaderFields() {
    this.eventNamesFields = this.headers.map((data) => data.fieldName);
    this.eventNamesFields.push("actions");
  }

  selectEvent(event: Event, action: TableActions) {
    this.event.emit({event, action});
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);
    this.paginatedEvents = this.events.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }


  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return; 
    }
    this.currentPage = page;
    this.updatePagination();
  }

  changeItemsPerPage(limit: number) {
    this.itemsPerPage = limit;
    this.currentPage = 1;
    this.updatePagination();
  }

}
