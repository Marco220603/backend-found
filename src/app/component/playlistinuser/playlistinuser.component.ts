import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlistinuser',
  templateUrl: './playlistinuser.component.html',
  styleUrls: ['./playlistinuser.component.css']
})
export class PlaylistinuserComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void{}
}
