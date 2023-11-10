import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temper',
  templateUrl: './temper.component.html',
  styleUrls: ['./temper.component.css']
})
export class TemperComponent{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void{}
}
