export interface Comment {
    commentId:number;
    creatorId:number;
    parentId:number|null;
    creatorName:string;
    eventId:number;
    data:string;
    creationDate:string
  }