import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Comment} from '../../app/models/comment.interface'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(data: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.eventsURL}/${data.id}`).pipe(
      tap((data: Comment[]) => data),
      catchError(err => throwError(() => err))
   )
  }

  getComment(data: any): Observable<Comment> {
    return this.http.get<Comment>(`${environment.commentsURL}/${data.id}`).pipe(
      tap((data: Comment) =>{ ;return data}),
      catchError(err => throwError(() => err))
   )
  }

  updateComment(payload:{text:string,comment: Comment,parentId:number|null}) : Observable<Comment> {
    let newComment:Comment={
      commentId:payload.comment.commentId,
      creatorId:payload.comment.creatorId,
      parentId:payload.comment.parentId,
      creatorName:payload.comment.creatorName,
      eventId:payload.comment.eventId,
      data:payload.text,
      creationDate:payload.comment.creationDate
    };
    return this.http.patch<Comment>(`${environment.eventsURL}/${payload.comment.eventId}`, newComment)
    .pipe(
      catchError(err => throwError(() => err))
   )
  }


  postComment(comment: Comment|{ eventId:number,data:string,parentId:number|null}|null) : Observable<any> {
    console.log(comment)
    return this.http.post<Comment>(`${environment.eventsURL}/${comment!.eventId}`, comment)
    .pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
   )
  }

  deleteComment(comment:Comment) : Observable<Comment> {
    return this.http.delete<Comment>(`${environment.commentsURL}/${comment.commentId}`)
    .pipe(
      catchError(err => throwError(() => err))
   )
  }

}
