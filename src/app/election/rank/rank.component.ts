import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {

  @ViewChild('internetNotWorking') internetNotWorking: any;
  constructor(
    private httpService: HttpService,
    private modalService: NgbModal,
    private route: Router
  ) { }

  public rajasthan: boolean = true;
  public chhattisgarh: boolean = false;
  public mp: boolean = false;
  public telangana: boolean = false;
  public mizoram: boolean = false; 


  public Rajasthan: any;
  public Chhattisgarh: any;
  public MP: any;
  public Telangana: any;
  public Mizoram: any;
  public year2017: any;
  public year2012: any;
  public user: any;
  
  ngOnInit(): void {
    this.getLeaderBoardData()
  } 

  async getLeaderBoardData() {
    let tmpData: any = localStorage.getItem('userData') || '';
    let mobileNumber: number = 0;
    if (tmpData) {
      tmpData = JSON.parse(tmpData);
      mobileNumber = tmpData.mobileNumber;
    }
    await this.httpService.postRequest('getleaderboardata', { "mobileNumber": mobileNumber }).pipe().subscribe((result: any) => {
      if (result) {
        // console.log(JSON.parse(result))
        result = JSON.parse(result.message)
       
        this.Rajasthan = result.Rajasthan;        
        this.Chhattisgarh = result.Chhattisgarh;
        this.MP = result.MP;
        this.Telangana = result.Telangana;
        this.Mizoram = result.Mizoram;
        this.user = result.user; 
        
      }
    }, (error) => {

      this.modalService.open(this.internetNotWorking);
    })
  }

  click(name: string) {

    if (name === 'rajasthan') {
      this.rajasthan = true;
      this.chhattisgarh = false;
      this.mp = false;
      this.telangana = false;
      this.mizoram = false;
      return;
    }
    if (name === 'chhattisgarh') {
      this.rajasthan = false;
      this.chhattisgarh = true;
      this.mp = false;
      this.telangana = false;
      this.mizoram = false;
      return;
    }
    if (name === 'mp') {
      this.rajasthan = false;
      this.chhattisgarh = false;
      this.mp = true;
      this.telangana = false;
      this.mizoram = false;
      return; 
    }
    if (name === 'telangana') {
      this.rajasthan = false;
      this.chhattisgarh = false;
      this.mp = false;
      this.telangana = true;
      this.mizoram = false;
      return;
    }
    if (name === 'mizoram') {
      this.rajasthan = false;
      this.chhattisgarh = false;
      this.mp = false;
      this.telangana = false;
      this.mizoram = true;
      return;
    }
  }

  claim() {
    this.route.navigate(['form'])
  }
}
