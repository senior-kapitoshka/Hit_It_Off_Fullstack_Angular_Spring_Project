/*import { Component, Input, OnInit, inject } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { ActiveComment } from '../../../app/models/active-comment.interface';
import { Comment } from '../../../app/models/comment.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../app/state/app.state';
import { Store } from '@ngrx/store';
import { CommentsActions } from '../../state/comments.actions';
import { DataService } from '../../../core/services/data.service';
import { Actions, ofType } from '@ngrx/effects'
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-comments',
  standalone:false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[]=[];
  currentUserId!: number|null;
  id:number;
  activeComment: ActiveComment | null = null;
  action:{type:string,commentId:number|null}|null;
  cookieService = inject(CookieService);

  constructor(private actRouter: ActivatedRoute,
    private store: Store<AppState>,
    private dataService:DataService,
    private updates$: Actions
    ) {
      this.id=this.actRouter.snapshot.params['id'];
      this.dataService.currentId.subscribe(id=>{
        this.currentUserId = id? id
        : (this.cookieService.check('id') ? parseInt(this.cookieService.get("id")) : null);
      });
      this.action=null;
      this.updates$.pipe(
        ofType(CommentsActions.ADD_COMMENT_API,
          CommentsActions.MODIFY_COMMENT_API,
          CommentsActions.DELETE_COMMENT_API
          )
      ).subscribe((c:any)=>{
        if(this.action){
          if(this.action!.type==="post"){
            console.log(c.payload)
            this.comments = [...this.comments, c.payload];
            this.activeComment = null;
          }else if(this.action!.type==="delete"){
            this.comments = this.comments.filter(
              (comment) => comment.commentId !== this.action!.commentId
            );
          }else if(this.action!.type==="update"){
            this.comments = this.comments.map((comment) => {
              if (comment.commentId === this.action!.commentId) {
                let newComment:Comment={
                  commentId:c.payload.comment.commentId,
                  creatorId:c.payload.comment.creatorId,
                  parentId:c.payload.comment.parentId,
                  creatorName:c.payload.comment.creatorName,
                  eventId:c.payload.comment.eventId,
                  data:c.payload.text,
                  creationDate:c.payload.comment.creationDate
                };
                return newComment;
              }
              return comment;
            })
              this.activeComment=null;
            }
            this.action=null;
          }
        }
      )
    }

  ngOnInit(): void {
    
  }
  getRootComments(): Comment[] {
    return this.comments.filter((comment) => { 
      return comment.parentId === null});
  }

  updateComment({
    text,
    comment,
  }: {
    text: string;
    comment: Comment;
  }): void {
    this.action={type:"update",commentId:comment.commentId};
    this.store.dispatch({type: CommentsActions.MODIFY_COMMENT_API, payload:{text,comment}});
  }

  deleteComment(comment:Comment): void {
    this.action={type:"delete",commentId:comment.commentId};
    this.store.dispatch({type: CommentsActions.DELETE_COMMENT_API, payload: comment});
  }

  setActiveComment(activeComment: ActiveComment | null): void {
    this.activeComment = activeComment;
  }

  addComment({
    text,
    parentId,
  }: {
    text: string;
    parentId: number | null;
  }) {
    this.action={type:"post",commentId:null};
    this.store.dispatch({type: CommentsActions.ADD_COMMENT_API, payload:{ eventId:this.id,data:text,parentId:parentId}})
}


  getReplies(commentId: number): Comment[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (lhs, rhs) =>
          new Date(lhs.creationDate).getTime() - new Date(rhs.creationDate).getTime()
      );
  }
}*/

import { Component, Input, OnInit, inject, OnDestroy } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { ActiveComment } from '../../../app/models/active-comment.interface';
import { Comment } from '../../../app/models/comment.interface';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../app/state/app.state';
import { Store } from '@ngrx/store';
import { CommentsActions } from '../../state/comments.actions';
import { DataService } from '../../../core/services/data.service';
import { Actions, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() comments: Comment[] = [];
  id: number;
  activeComment: ActiveComment | null = null;
  action: { type: string, commentId: number | null } | null = null;

  private subscriptions = new Subscription();
  private cookieService = inject(CookieService);

  constructor(
    private actRouter: ActivatedRoute,
    private store: Store<AppState>,
    private dataService: DataService,
    private updates$: Actions
  ) {
    this.id = this.actRouter.snapshot.params['id'];
  }

  // Геттер для получения текущего пользователя
  get currentUserId(): number | null {
    const idFromDataService = this.dataService.currentIdValue;
    if (idFromDataService && idFromDataService > 0) return idFromDataService;
    if (this.cookieService.check('id')) return parseInt(this.cookieService.get('id'));
    return null;
  }
  
  ngOnInit(): void {
    this.subscriptions.add(
      this.updates$
        .pipe(
          ofType(
            CommentsActions.ADD_COMMENT_API,
            CommentsActions.MODIFY_COMMENT_API,
            CommentsActions.DELETE_COMMENT_API
          )
        )
        .subscribe((c: any) => this.handleCommentAction(c))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleCommentAction(c: any): void {
    if (!this.action) return;

    const { type, commentId } = this.action;

    switch (type) {
      case 'post':
        this.comments = [...this.comments, c.payload];
        this.activeComment = null;
        break;

      case 'delete':
        this.comments = this.comments.filter(comment => comment.commentId !== commentId);
        break;

      case 'update':
        this.comments = this.comments.map(comment =>
          comment.commentId === commentId
            ? {
                ...comment,
                data: c.payload.text
              }
            : comment
        );
        this.activeComment = null;
        break;
    }

    this.action = null;
  }

  getRootComments(): Comment[] {
    return this.comments.filter(comment => comment.parentId === null);
  }

  updateComment({ text, comment }: { text: string; comment: Comment }): void {
    this.action = { type: 'update', commentId: comment.commentId };
    this.store.dispatch({ type: CommentsActions.MODIFY_COMMENT_API, payload: { text, comment } });
  }

  deleteComment(comment: Comment): void {
    this.action = { type: 'delete', commentId: comment.commentId };
    this.store.dispatch({ type: CommentsActions.DELETE_COMMENT_API, payload: comment });
  }

  setActiveComment(activeComment: ActiveComment | null): void {
    this.activeComment = activeComment;
  }

  addComment({ text, parentId }: { text: string; parentId: number | null }): void {
    this.action = { type: 'post', commentId: null };
    this.store.dispatch({ type: CommentsActions.ADD_COMMENT_API, payload: { eventId: this.id, data: text, parentId } });
  }

  getReplies(commentId: number): Comment[] {
    return this.comments
      .filter(comment => comment.parentId === commentId)
      .sort((lhs, rhs) => new Date(lhs.creationDate).getTime() - new Date(rhs.creationDate).getTime());
  }
}
