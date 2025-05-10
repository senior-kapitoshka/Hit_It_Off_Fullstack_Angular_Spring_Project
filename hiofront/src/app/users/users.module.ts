import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, routes } from './users-routing.module';
import { UsersListPageComponent } from './components/users-list-page/users-list-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersReducer } from './state/users.reducers';
import { StoreModule } from '@ngrx/store';
import { EventsEffects } from '../events/state/events.effects';
import { UsersEffects } from './state/users.effects';
import { EffectsModule } from '@ngrx/effects';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersListPageComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule ,

    StoreModule.forFeature('usersState', UsersReducer),
    EffectsModule.forFeature([UsersEffects]),
    EffectsModule.forRoot([])
],providers: [

    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
    ),],
})
export class UsersModule { }
