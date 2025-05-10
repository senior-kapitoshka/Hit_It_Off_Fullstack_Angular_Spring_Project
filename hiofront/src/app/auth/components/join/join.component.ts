import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../../../app/core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/auth.actions';

@Component({
  selector: 'app-join',
  standalone:false,
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent {

  constructor(
    private store: Store,

  ) { }


  submitForm(data:{username:string,email:string,password:string,city:string}) {
      this.store.dispatch({type: AuthActions.CREATE_USER, payload: data})
    }
    
}



