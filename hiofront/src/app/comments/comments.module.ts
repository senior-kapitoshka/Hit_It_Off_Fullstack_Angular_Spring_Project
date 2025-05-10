import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsEditComponent } from './components/comments-edit/comments-edit.component';
import { StoreModule } from '@ngrx/store';
import { CommentsReducer } from './state/comments.reducers';
import { CommentsEffects } from './state/comments.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommentsFormComponent } from './components/comments-form/comments-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
   // CommentsComponent,
    //CommentsEditComponent,
    //CommentsFormComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,
    CommentsRoutingModule,StoreModule.forFeature('commentsState', CommentsReducer),
    EffectsModule.forFeature([CommentsEffects]),
    EffectsModule.forRoot([])
  ]
})
export class CommentsModule { }
