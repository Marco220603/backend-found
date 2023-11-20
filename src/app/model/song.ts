import { Gender } from "./gender";

export class Songs{
    idSong:number=0;
    nameSong:string="";
    gender:Gender =new Gender()
    artist:number=0;
    fechaSong:Date = new Date(Date.now())
}