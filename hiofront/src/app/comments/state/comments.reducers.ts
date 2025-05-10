import { createReducer, on } from '@ngrx/store';
import {Comment} from '../../app/models/comment.interface'
import { setComments,addCommentState,deleteCommentState,setCommentDataToEdit,} from './comments.actions';

export interface CommentsState {
    comments: ReadonlyArray<Comment>;
    comment:Readonly<Comment>;
}

export const initialState: CommentsState = {
    comments: [],
  comment:{
    commentId:0,
    parentId:0,
    creatorId:0,
    creatorName:"",
    eventId:0,
    data:"",
    creationDate:""
  }
}

export const CommentsReducer = createReducer(
  initialState,
  on(setComments, (state, { comments }) => { return {...state, comments}}),
  on(addCommentState, (state, {comment}) => {
    return {...state, comments: [...state.comments, comment]}
  }),
  on(setCommentDataToEdit, (state, { comment }) => { return {...state, comment}}),

  on(deleteCommentState, (state, { commentId }) => {
    return {...state, comments: state.comments.filter(data => data.commentId != commentId)}
  }),

  );