import { Component } from '@angular/core';
import { User } from '../../../app/models/user.interface';
import { Router } from '@angular/router';
import { AppState } from '../../../app/state/app.state';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../state/users.actions';
import { TableActions } from '../../../app/models/page-actions.enum';
import { selectUsers } from '../../state/users.selectors';

@Component({
  selector: 'app-users-list-page',
  standalone:false,
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.css'
})
export class UsersListPageComponent {
  headers:{header: string, fieldName: keyof User}[] = [
    {header: "id", fieldName: "id"},
    {header: "username", fieldName: "username"},
    {header: "email", fieldName: "email"},
    {header: "city", fieldName: "city"},
    {header: "about", fieldName: "about"},
    {header: "eventsAmount", fieldName: "eventsAmount"},
    {header: "role", fieldName: "role"},
  ];
  users: ReadonlyArray<User> = [];
  users$=this.store.select(selectUsers());
  //usersStore$ = this.store.select(selectUsers());

  constructor(
    private store: Store<AppState>,
    ) { }

    ngOnInit(): void {
      this.store.dispatch({type: UsersActions.GET_USER_LIST});
      //this.assignUsers();
    }
  
   /* assignUsers() {
      this.usersStore$.subscribe((data) => {
        this.users = data;
      });
    }*/

    selectUser(data: {user: User, action: TableActions}) {
      switch(data.action) {
        case TableActions.Admin: {
          let user:User=structuredClone(data.user);
          if(data.user.role!=="ROLE_ADMIN")user.role="ROLE_ADMIN";
          else user.role="ROLE_USER";
          this.store.dispatch({type: UsersActions.MODIFY_USER_API, payload: user});
          return;
  
        }
        case TableActions.Banned: {

          let user:User=structuredClone(data.user);
          if(data.user.role!=="ROLE_BANNED")user.role="ROLE_BANNED";
          else user.role="ROLE_USER";
          this.store.dispatch({type: UsersActions.MODIFY_USER_API, payload: user});
          return;
        }
        case TableActions.Mute: {
          let user:User=structuredClone(data.user);
          if(data.user.role!=="ROLE_MUTED")user.role="ROLE_MUTED";
          else user.role="ROLE_USER";
          this.store.dispatch({type: UsersActions.MODIFY_USER_API, payload: user});
          return;
        }
        case TableActions.Delete: {
          this.store.dispatch({type: UsersActions.DELETE_USER_API, payload: data.user});
          return;
  
        }
        default: ""
      }
    }


}


