import { Roles } from "./roles.enum";

export interface User {
    id:number;
    username:string;
    email:string;
    city:string;
    about:string;
    eventsAmount:number;
    role:Roles|string
  }