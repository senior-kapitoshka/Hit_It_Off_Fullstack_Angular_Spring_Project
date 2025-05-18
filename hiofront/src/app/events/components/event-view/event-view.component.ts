import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {Event} from '../../../app/models/event.interface'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../../core/services/data.service';
import { TableActions } from '../../../app/models/page-actions.enum';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
declare let bootstrap: any;

@Component({
  selector: 'app-event-view',
  standalone:false,
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.css'
})
export class EventViewComponent implements OnInit {
  @Input() headers: Array<{header: string, fieldName: keyof Event}> = [];
  @Input() event: Readonly<Event> | null = null;
  @Input()inParty?:number;
  ///////////
  @Output() eventOut = new EventEmitter<{event: Event, action :TableActions}>();
  /////////
 eventNamesFields: string[] = [];
 currentUserId!:number;
 cookieService = inject(CookieService);
 creatorId?:number;
 pendingDeleteEvent: Event | null = null;
 isMobileView = false;

 private subscriptions = new Subscription();

 modalImageUrl: string | null = null;

openImageModal(url: string) {
  this.modalImageUrl = url;
}

closeModal() {
  this.modalImageUrl = null;
}

 
/////////
  constructor(
    private dataService:DataService) { 
    /*this.dataService.currentId.subscribe(id=>{
      
        if(id!=null)this.currentUserId = id?id:parseInt(this.cookieService.get("id"));
      });*/
      
  }
/////////
  ngOnInit(): void {
        this.getHeaderFields();
    const id=this.dataService.currentId.subscribe(id=>{
      if(id!=null)this.currentUserId = id?id:parseInt(this.cookieService.get("id"));
    });
    this.subscriptions.add(id);

    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  
  }



checkScreenSize(): void {
  this.isMobileView = window.innerWidth < 768;
}


  getHeaderFields() {
     this.eventNamesFields = this.headers.map((data) =>data.fieldName);
    this.eventNamesFields.push("actions");
  }

  /////////////////////////////////
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


confirmDelete() {
  if (this.pendingDeleteEvent) {
    this.selectEvent(this.pendingDeleteEvent, 1); 
    this.pendingDeleteEvent = null;

    const modalEl = document.getElementById('deleteConfirmModal');
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();
  }
}


  selectEvent(event: Event, action: TableActions) {
    this.eventOut.emit({event, action});
  }

  correctDate(date:string):string{
    const matches:any = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/gi);
    let res=matches?matches[0]:undefined;
    return res;
  }

    
    getImageUrl(imageName: string | undefined|null): string {
      const baseUrl = environment.baseURL || 'http://localhost:8080'; 
      return imageName ? `${baseUrl}uploads/${imageName}` : '';
    }
  

}
