import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.scss']
})
export class PrizeComponent implements OnInit {

  constructor() { }
  public image = environment.image
  ngOnInit(): void {
  }

}
