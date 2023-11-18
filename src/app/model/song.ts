import { Artist } from "./artist";
import { Gender } from "./gender";

export class Songs{
    idSong:number=0;
    nameSong:string="";
    gender:Gender=new Gender();
    artist:Artist = new Artist();
    fechaSong:Date = new Date(Date.now())
}