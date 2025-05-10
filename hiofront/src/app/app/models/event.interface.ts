export interface Event{
    id:number;
    creatorId:number
    city:string;
    eventName:string;
    description:string;
    usersAmount:number;
    restrictions:boolean;
    restrictionsLimit:number;
    eventDate:string;
    eventImg: string | null; 
}