import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { SwiperComponent } from "swiper/angular";


@Component({
  selector: 'app-t',
  templateUrl: './t.component.html',
  styleUrls: ['./t.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class TComponent implements OnInit {

  public isenabled: boolean = false;
  public image = environment.image
  public strtBtn = false;
  constructor(private route: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
   let btn = localStorage.getItem('flag') || '';
   console.log('btn : '+btn)
   if(btn === 'true') {
     console.log(btn)
     this.strtBtn = true;
   }
  }
  state(param:any) {
    console.log("click")
    console.log(this.isenabled)
    if(!this.isenabled){
      this.checkBoxPopUp(param);
      return;
    }
    localStorage.setItem('flag','true')
    this.route.navigate(['state'])
  }

  start() {
    this.route.navigate(['state'])
  }
  changeIsenabled() {
    console.log(this.isenabled)
    this.isenabled = !this.isenabled;
  }

  checkBoxPopUp(param: any) {
    this.modalService.open(param);
  }

  next(){
    console.log('next ')
    this.route.navigate(['howtoplay'])
  }
}





