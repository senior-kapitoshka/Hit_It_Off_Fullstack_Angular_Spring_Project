import { Component, Input, OnInit, Output,EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Store, select } from '@ngrx/store';
import { AuthActions } from '../../state/auth.actions';
//import { selectError } from '../../auth/state/auth.selectors';
import { AppState } from '../../../app/state/app.state';

import { DataService } from '../../../core/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  error$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private service: AuthService,
    private router: Router,
  ) {

    this.checkJWT();
    this.error$ = this.store.pipe(select(state => state.authState.error));
  }

  ngOnInit(): void {
  }

  submitForm(data:{username:string,password:string}) {
    this.store.dispatch({type: AuthActions.LOGIN, payload: data});
  }
  checkJWT() {
    if(this.service.isAuthenticated()) {
      this.router.navigate(['home'])
    }
  }
}






