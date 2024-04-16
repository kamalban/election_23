import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  public image = environment.image
  constructor(private route: Router,
    ) { }

  ngOnInit(): void {
    
  }

  showRank(){
    this.route.navigateByUrl('rank')
  }
  
  Tips(){
    this.route.navigateByUrl('tips')
  }

  Howtoplay(){
    this.route.navigateByUrl('howtoplay')
  }

  home(){
    console.log('h')
    this.route.navigateByUrl('home')
  }
}
