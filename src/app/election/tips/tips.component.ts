import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  constructor() { } 
  public Rajasthan: boolean = true;
  public Chhattisgarh: boolean = false;
  public mp: boolean = false;
  public Telangana: boolean = false;
  public Mizoram: boolean = false;
  public year2017: boolean = true;
  // public year2012: boolean = false;
  ngOnInit(): void {
  }
  click(name: string){

    if(name === 'Rajasthan') {
      this.Rajasthan = true;
      this.mp = false;
      this.Chhattisgarh = false;
      this.Telangana = false;
      this.Mizoram = false;

      return;
    } 
    if(name === 'mp') {
      this.Rajasthan = false;
      this.mp = true;
      this.Chhattisgarh = false;
      this.Telangana = false;
      this.Mizoram = false;
      return;
    }
    if(name === 'Chhattisgarh') {
      this.Rajasthan = false;
      this.mp = false;
      this.Chhattisgarh = true;
      this.Telangana = false;
      this.Mizoram = false;
    }
    if(name === 'Telangana') {
      this.Rajasthan = false;
      this.mp = false;
      this.Chhattisgarh = false;
      this.Telangana = true;
      this.Mizoram = false;
      return;
    }
    if(name === 'Mizoram') {
      this.Rajasthan = false;
      this.mp = false;
      this.Chhattisgarh = false;
      this.Telangana = false;
      this.Mizoram = true;
      return;
    }
  }
  switchData(name:string){
    if(name === "year2017") {
      this.year2017 = true; 
      
    } 
   
  }
}
