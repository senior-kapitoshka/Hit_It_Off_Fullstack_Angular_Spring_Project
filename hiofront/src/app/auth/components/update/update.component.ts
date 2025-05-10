import { Component, OnInit } from '@angular/core';
import {  FormGroup} from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/auth.actions';
import { AppState } from '../../../app/state/app.state';
import { User } from '../../../app/models/user.interface';
import { selectUser } from '../../state/auth.selectors';
import { ViewChild, ElementRef } from '@angular/core';
declare let bootstrap: any;

@Component({
  selector: 'app-update',
  standalone:false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  updateForm: FormGroup | undefined;

  userDetails:User|null=null;
  //authStore$=this.store.select(selectUser());
  user$ = this.store.select(selectUser());
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;


  constructor(
    private store: Store<AppState>
  ) {
   }


   ngOnInit(): void {
      
    this.store.dispatch({type: AuthActions.GET_USER});
    //this.assignEvent();
  }
  
  /*assignEvent() {
    this.authStore$.subscribe((user:any) => {
      if(user) {
        this.userDetails = user;
      }
    });
  }*/

  submitForm(data:{email:string,city:string,about:string}) {
      this.store.dispatch({type: AuthActions.UPDATE, payload: data});
      const toast = new bootstrap.Toast(this.successToast.nativeElement);
      toast.show();
    }



}


