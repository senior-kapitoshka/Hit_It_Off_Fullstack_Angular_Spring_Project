import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app/state/app.state';
import {Comment} from '../../app/models/comment.interface'
import { CommentsState } from './comments.reducers';


export const selectCommentsState = createFeatureSelector<CommentsState>('commentsState')

export const selectComments = () => createSelector(
    selectCommentsState,
    (state: CommentsState) => state.comments
)

export const selectCommentData = () => createSelector(
    selectCommentsState,
    (state: CommentsState) => state.comment
)

export const selectComment = (id: number) => createSelector(
    selectCommentsState,
    (state: CommentsState) => state.comments.find((d:any) =>{
        console.log(id)
        console.log(d.commentId)
         return  d.commentId === id;
        }) 
)

export const selectCommentToEdit = (id: number) => createSelector(
    selectCommentsState,
    (state: CommentsState) => state.comments.find((d:any) =>{
         return  d.id === id;
        }) 
)