import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: boolean = false;
  public image = environment.image
  public button: boolean = true;
  public userNum: string = '';
  constructor(
    private localStorageService: LocalstorageService,
    @Inject(LOCALE_ID) protected localeId: string,
    private route: Router
  ) { }
  public token: string = ''
  ngOnInit(): void {
    this.localStorageService.buttonHide.subscribe(value => {
      this.button = value;

    })


    let tmp = localStorage.getItem('token') || '';
    if (tmp.length != 0) {
      this.user = true
    } else {
      this.user = false
    }
    let tmpNUm: any = localStorage.getItem('Number') || '';
      if (tmpNUm) {
        this.userNum = tmpNUm
      }
    this.localStorageService.localStorageData.pipe().subscribe((data) => {
      let tmp = localStorage.getItem('token') || '';
      if (tmp.length != 0) {
        this.user = true
      } else {
        this.user = false
            }
                  let tmpNUm: any = localStorage.getItem('Number') || '';
      if (tmpNUm) {
        this.userNum = tmpNUm
      }
    })
  }

  changeLan() {
    console.log('change... language.....')
  }

  changeState() {
    this.route.navigateByUrl('')
  }
  howToPlay() {
    this.route.navigateByUrl('/howtoplay')
  }
  isHide(routeName: string) {
    const routesArray = this.route.url.split("/")
    for(let url of routesArray){
      if(url[1] && url[1]=== '_') return false
    }
    return true
  }
}
