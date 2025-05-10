import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventViewComponent } from './components/event-view/event-view.component';
import { EventViewPageComponent } from './components/event-view-page/event-view-page.component';
import { EventsFormComponent } from './components/events-form/events-form.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsListPageComponent } from './components/events-list-page/events-list-page.component';
import { EventsFormPageComponent } from './components/events-form-page/events-form-page.component';
import {EventsRoutingModule} from './events-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material/material.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EventsReducer } from './state/events.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffects } from './state/events.effects';

import { EventsCommandBarComponent } from './components/events-command-bar/events-command-bar.component';


import { routes } from './events-routing.module';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { CommentsReducer } from '../comments/state/comments.reducers';
import { CommentsEffects } from '../comments/state/comments.effects';
import { CommentsEditComponent } from '../comments/components/comments-edit/comments-edit.component';
import { CommentsComponent } from '../comments/components/comments/comments.component';
import { CommentsFormComponent } from '../comments/components/comments-form/comments-form.component';
import { EventProfileComponent } from './components/event-profile/event-profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule } from  '@angular/material/core'
import { SharedMdModule } from '../shared/shared-md/shared-md.module';
import { MatExpansionModule,MatAccordion } from '@angular/material/expansion';
import { IsGrantedDirective } from '../app/directives/is-granted.directive';
@NgModule({
  declarations: [
    
    CommentsEditComponent,
    CommentsFormComponent,
    CommentsComponent,
    EventViewComponent,
    EventViewPageComponent,
    EventsCommandBarComponent,
    EventsFormComponent,
    EventsListComponent,
    EventsListPageComponent,
    EventsFormPageComponent,
    EventEditComponent,
    
  ],
  imports: [
    SharedMdModule,
    FormsModule,
    EventsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatExpansionModule,
    MatAccordion,
    StoreModule.forFeature('eventsState', EventsReducer),
    StoreModule.forFeature('commentsState', CommentsReducer),

    EffectsModule.forFeature([EventsEffects,CommentsEffects]),
    EffectsModule.forRoot([])
],providers: [
  MatDatepickerModule,
  MatExpansionModule,
  MatAccordion,
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
    ),],
})
export class EventsModule { }
