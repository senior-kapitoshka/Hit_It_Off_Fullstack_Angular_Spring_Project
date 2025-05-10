import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CommentsActions } from './comments.actions';
import { EMPTY, forkJoin } from 'rxjs';
import { inject } from '@angular/core';
import { CommentsService } from '../../core/services/comments.service';
import {Comment} from '../../app/models/comment.interface'

@Injectable()
export class CommentsEffects {
    constructor(
        ) {}
    private actions$=inject(Actions);
    private commentsService=inject(CommentsService);
    private router=inject(Router);


getComments$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CommentsActions.GET_COMMENTS),
        mergeMap((data) => this.commentsService.getComments(data)
          .pipe(
            map(comments => ({ type: CommentsActions.SET_COMMENTS, comments })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );

  getCommentToEdit$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CommentsActions.GET_COMMENT_TO_EDIT),
        mergeMap((data) => this.commentsService.getComment(data)
          .pipe(
            map(comment => ({ type: CommentsActions.SET_COMMENT_TO_EDIT, comment })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );

  postComment$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CommentsActions.ADD_COMMENT_API),
        mergeMap((data: {type: string, payload: Comment}) => this.commentsService.postComment(data.payload)
          .pipe(
            map(comment => ({ type: CommentsActions.ADD_COMMENT_STATE, comment })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );

  modifyComment$ = createEffect(() =>{
    return this.actions$.pipe(
        ofType(CommentsActions.MODIFY_COMMENT_API),
        mergeMap((data: any) => 
        {return this.commentsService.updateComment(data.payload)
          .pipe(
            map(_ => ({ type: CommentsActions.MODIFY_COMMENT_STATE, comment: data.payload.comment })),
            tap(() =>  this.router.navigate(["events",data.payload.comment.eventId])),
            catchError(() => EMPTY)
          )})
        )
    }, {dispatch: true})

  deleteComment$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CommentsActions.DELETE_COMMENT_API),
        mergeMap((data: {type: string, payload: Comment}) =>{ return this.commentsService.deleteComment(data.payload)
          .pipe(
            map(() => ({ type: CommentsActions.DELETE_COMMENT_STATE, commentId: data.payload.commentId })),
            tap(() =>  this.router.navigate(["events",data.payload.eventId])),
            catchError(() => EMPTY)
          )})
        )
    }, {dispatch: true}
  );

}