import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { Roles } from '../../app/models/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private isLog=new BehaviorSubject<boolean>(localStorage['jwtToken']!==undefined);
  private username=new BehaviorSubject<string>("");
  private id=new BehaviorSubject<number>(0);
  private pageId=new BehaviorSubject<number>(0);
  private city=new BehaviorSubject<String>("");
  private eventsAmount=new BehaviorSubject<number>(0);
  private role=new BehaviorSubject<string>("");

  currentState = this.isLog.asObservable();
  currentName= this.username.asObservable();
  currentId=this.id.asObservable();
  currentPageId=this.pageId.asObservable();
  currentCity=this.city.asObservable();
  currentEventsAmount=this.eventsAmount.asObservable();
  currentRole = this.role.asObservable();

  constructor() { }

  log(log:boolean){
    this.isLog.next(log);
  }

  name(name:string){
    this.username.next(name);
  }
  setId(id:number){
    this.id.next(id);
  }
  setPageId(pageId:number){
    this.pageId.next(pageId);
  }

  setCity(city:String){
    this.city.next(city);
  }

  setEventsAmount(eventsAmount:number){

  }
  setRole(role:string|Roles){
    this.role.next(role);
  }

}
