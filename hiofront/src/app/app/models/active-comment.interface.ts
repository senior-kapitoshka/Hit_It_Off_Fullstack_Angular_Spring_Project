import { ActiveCommentType } from './active-comment-type.enum';

export interface ActiveComment {
  commentId: number;
  type: ActiveCommentType;
}