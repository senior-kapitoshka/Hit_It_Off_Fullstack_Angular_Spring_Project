/*import { Component, EventEmitter, Input, OnInit, Output, inject,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../app/state/app.state';
import { CommentsService } from '../../../core/services/comments.service';
import { Store } from '@ngrx/store';
import { CommentsActions } from '../../state/comments.actions';
import { selectCommentData } from '../../state/comments.selectors';
import {Comment} from '../../../app/models/comment.interface'
import {ActiveComment} from '../../../app/models/active-comment.interface'
import {ActiveCommentType} from '../../../app/models/active-comment-type.enum'
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-comments-edit',
  standalone:false,
  templateUrl: './comments-edit.component.html',
  styleUrl: './comments-edit.component.css'
})
export class CommentsEditComponent implements OnInit,OnChanges {
  @Input() comment!: Comment;
  @Input() activeComment!: ActiveComment | null;
  @Input() replies!: Comment[];
  @Input() currentUserId!: number|null;
  @Input() parentId!: number | null;

  @Output()
  setActiveComment = new EventEmitter<ActiveComment | null>();
  @Output()
  deleteComment = new EventEmitter<Comment>();
  @Output()
  addComment = new EventEmitter<{ text: string; parentId: number | null }>();
  @Output()
  updateComment = new EventEmitter<{text: string,comment:Comment}>();

  createdAt: string = '';
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentType;
  replyId: number| null = null;
  cookieService = inject(CookieService);
  username?:string;

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.commentId === this.comment!.commentId &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }
  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.commentId === this.comment!.commentId &&
      this.activeComment.type === 'editing'
    );
  }

  id:number;
  commentToEdit: Comment|null=null;
  //commentStore$=this.store.select(selectCommentData());
  constructor(private actRouter: ActivatedRoute,
    private store: Store<AppState>,
    ){
      this.id=this.actRouter.snapshot.params['id'];
    }

    ngOnInit(): void {
      this.createdAt = new Date(this.comment.creationDate).toLocaleDateString();
    this.replyId = this.parentId ? this.parentId : this.comment.commentId;
    this.username = this.cookieService.get("username");
    }
    
    ngOnChanges(){
      if (!this.comment || this.currentUserId == null) return;

      const fiveMinutes = 5 * 60 * 1000;
      const timePassed =
        Date.now() - new Date(this.comment.creationDate).getTime() > fiveMinutes;

      this.createdAt = new Date(this.comment.creationDate).toLocaleDateString();
      this.canReply = true;
      this.canEdit = this.currentUserId === this.comment.creatorId && !timePassed;
      this.canDelete =
        this.currentUserId === this.comment.creatorId &&
        this.replies.length === 0 &&
        !timePassed;
      this.replyId = this.parentId ? this.parentId : this.comment.commentId;
      this.username = this.cookieService.get("username");
    }

    
}*/

import { Component, EventEmitter, Input, OnInit, Output, inject, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActiveCommentType } from '../../../app/models/active-comment-type.enum';
import { ActiveComment } from '../../../app/models/active-comment.interface';
import { Comment } from '../../../app/models/comment.interface';

@Component({
  selector: 'app-comments-edit',
  standalone: false,
  templateUrl: './comments-edit.component.html',
  styleUrl: './comments-edit.component.css'
})
export class CommentsEditComponent implements OnInit, OnChanges {
  @Input() comment!: Comment;
  @Input() activeComment!: ActiveComment | null;
  @Input() replies!: Comment[];
  @Input() currentUserId!: number | null;
  @Input() parentId!: number | null;

  @Output() setActiveComment = new EventEmitter<ActiveComment | null>();
  @Output() deleteComment = new EventEmitter<Comment>();
  @Output() addComment = new EventEmitter<{ text: string; parentId: number | null }>();
  @Output() updateComment = new EventEmitter<{ text: string; comment: Comment }>();

  createdAt: string = '';
  replyId: number | null = null;
  activeCommentType = ActiveCommentType;
  cookieService = inject(CookieService);
  username?: string;

  ngOnInit(): void {
    this.createdAt = new Date(this.comment.creationDate).toLocaleDateString();
    this.replyId = this.parentId ? this.parentId : this.comment.commentId;
    this.username = this.cookieService.get("username");
  }

  ngOnChanges(): void {
    this.createdAt = new Date(this.comment.creationDate).toLocaleDateString();
    this.replyId = this.parentId ? this.parentId : this.comment.commentId;
    this.username = this.cookieService.get("username");
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.commentId === this.comment.commentId &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.commentId === this.comment.commentId &&
      this.activeComment.type === 'editing'
    );
  }

  get canReply(): boolean {
    return this.currentUserId !== null;
  }

  get canEdit(): boolean {
    if (!this.currentUserId || !this.comment) return false;
    const fiveMinutes = 5 * 60 * 1000;
    const timePassed = Date.now() - new Date(this.comment.creationDate).getTime() > fiveMinutes;
    return this.currentUserId === this.comment.creatorId && !timePassed;
  }
  
  get canDelete(): boolean {
    if (!this.currentUserId || !this.comment) return false;
    const fiveMinutes = 5 * 60 * 1000;
    const timePassed = Date.now() - new Date(this.comment.creationDate).getTime() > fiveMinutes;
    return this.currentUserId === this.comment.creatorId && this.replies.length === 0 && !timePassed;
  }
  
}

