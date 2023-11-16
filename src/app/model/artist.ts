import { Gender } from "./gender"
export class Artist {
  idartist:number=0 
  nameartist:string=""
  gender:Gender = new Gender()  
  photoUrl?: string; // Add this property
}        