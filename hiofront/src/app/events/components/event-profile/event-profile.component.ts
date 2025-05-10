import { Component, Input, OnInit } from '@angular/core';
import {Event} from '../../../app/models/event.interface'
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-profile',
  standalone:false,
  templateUrl: './event-profile.component.html',
  styleUrl: './event-profile.component.css'
})
export class EventProfileComponent implements OnInit{
  @Input() eventProfile!:Readonly<Event>
  date!:string;
  constructor(
    private router: Router,){
      
    }
  ngOnInit(): void {
    this.date=this.correctDate(this.eventProfile.eventDate);
  }
  correctDate(date:string):string{
    const matches:any = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/gi);
    return matches[0];
  }
  view(){
    this.router.navigate(['events',  this.eventProfile.id]);
  }
}
