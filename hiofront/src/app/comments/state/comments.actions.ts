import { createAction, props } from '@ngrx/store';
import {Comment} from '../../app/models/comment.interface'

export enum CommentsActions {
    GET_COMMENTS = '[Comment] Get Comment list',
    SET_COMMENTS = '[Comment] Set Comment list',
    ADD_COMMENT_API = '[Comment] Add Comment (API)',
    ADD_COMMENT_STATE = '[Comment] Add Comment (STATE)',

    GET_COMMENT_TO_EDIT = '[Comment] Get Comment to edit',
    SET_COMMENT_TO_EDIT  = '[Comment] Set Comment to edit',

    MODIFY_COMMENT_API = '[Comment] Modify Comment (API)',
  MODIFY_COMMENT_STATE = '[Comment] Modify Comment (STATE)',

    DELETE_COMMENT_API = '[Comment] Delete Comment (API)',
    DELETE_COMMENT_STATE = '[Comment] Delete Comment (STATE)',
}

export const getComments = createAction(
    CommentsActions.GET_COMMENTS,
  );

  export const setComments = createAction(
    CommentsActions.SET_COMMENTS,
    props<{ comments: ReadonlyArray<Comment> }>(),
    );

    export const addCommentState = createAction(
      CommentsActions.ADD_COMMENT_STATE,
      props<{ comment:Comment }>()
    );
  
    export const addCommentApi = createAction(
      CommentsActions.ADD_COMMENT_API,
      props<{ comment:Comment }>()
    );

    export const getCommentDataToEdit = createAction(
      CommentsActions.GET_COMMENT_TO_EDIT,
    );
    export const setCommentDataToEdit = createAction(
      CommentsActions.SET_COMMENT_TO_EDIT,
      props<{ comment: Comment }>(),
      );

      export const modifyEventsState = createAction(
        CommentsActions.MODIFY_COMMENT_STATE,
        props<{ comment: Comment }>()
    );

    export const deleteCommentState = createAction(
      CommentsActions.DELETE_COMMENT_STATE,
    props<{ commentId: number }>()
    );
