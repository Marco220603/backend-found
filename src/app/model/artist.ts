import { Gender } from "./gender"
export class Artist {
  idArtist:number=0 
  nameArtist:string=""
  gender:Gender = new Gender()  
  photoUrl?: string; // Add this property
}        