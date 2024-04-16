import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.scss']
})
export class CongratulationComponent implements OnInit {

  constructor(
    private route: Router,
    private httpService: HttpService,
    private modalService: NgbModal,
  ) { }
  
  @ViewChild('internetNotWorking') internetNotWorking:any;

  public doneState: string[] = [];
  public isState: boolean = false;
  public stateList: string[] = [];
  public data: any;
  public clicked: boolean = true;
  public image = environment.image;
  public state: any;
  public stateName: string = '';
  public listShow: string[] = [];
  public listShow2: string[] = [];
  public number: string = '';

  async ngOnInit(): Promise<void> {
    console.log('cngrts')
    let tmp: any = localStorage.getItem('doneList') || '';
    let tmpstate: any = localStorage.getItem('state') || '';
    let tmpStateName: any = localStorage.getItem('stateName') || ''
    if (tmpstate) {
      tmpstate = JSON.parse(tmpstate);
      this.state = tmpstate;
    }
    if (tmpStateName) {
      this.stateName = tmpStateName;
    }
    console.log(tmp)
    console.log(typeof tmp)
    if (tmp && tmp.length > 0) {
      console.log('tmp true')
      tmp = JSON.parse(tmp);
      console.log(tmp)
      // this.doneState = tmp;

      if (tmp && tmp.length !== 0) {
        for (let s = 0; s < tmp.length; s++) {
          if (tmp[s] !== 'Checked-' + this.stateName) {
            this.listShow.push(tmp[s])
            let name = tmp[s].split("-");
            if (name.length === 1) {
              this.listShow2.push(name[0])
            } else {
              this.listShow2.push(name[1])
            }
            console.log('naem split : ' + name)
          }
        }
        this.isState = true;
        console.log('list how : ' + this.listShow)
        console.log('is state : ' + this.isState)
        console.log('name list : ' + this.listShow2)
      }

    } else {
      console.log('else for list')
      // this.setDoneStateList()
      let tmp: any = localStorage.getItem('userData');
      let tmpdata: any = localStorage.getItem('state');
      if (tmp) {
        tmp = JSON.parse(tmp)
        this.data = tmp
      }
      if (tmpdata) {
        tmpdata = JSON.parse(tmpdata)
        this.stateList = tmpdata;
      }

      for (let i = 0; i < this.stateList.length; i++) {
        console.log('loop')
        if (this.data[this.stateList[i]] && this.data[this.stateList[i]].length !== 0) {
          this.doneState.push('Checked-' + this.stateList[i])
          if (this.stateName !== this.stateList[i]) {
            this.listShow.push('Checked-' + this.stateList[i]);
            this.listShow2.push(this.stateList[i])
          }
        } else {
          console.log('else')
          this.isState = true;
          this.doneState.push(this.stateList[i])
          this.listShow.push(this.stateList[i])
          this.listShow2.push(this.stateList[i])
        }
      }

      console.log(this.doneState)
      console.log('done state list set')
      localStorage.setItem('doneList', JSON.stringify(this.doneState))
    }
  }

  setDoneStateList() {
    let tmp: any = localStorage.getItem('userData');
    let tmpdata: any = localStorage.getItem('state');
    if (tmp) {
      tmp = JSON.parse(tmp)
      this.data = tmp
    }
    if (tmpdata) {
      tmpdata = JSON.parse(tmpdata)
      this.stateList = tmpdata;
    }
    console.log('statelist L: ' + this.stateList)
    console.log('state : ' + this.stateName)
    for (let i = 0; i < this.state.length; i++) {
      console.log('loop')
      this.state[i]
      if (this.data[this.state[i]] && this.data[this.state[i]].length !== 0 && this.state && this.state[i] !== this.stateName) {
        console.log('tck')
        let tmp = 'Checked-' + this.state[i];
        console.log(tmp)
        this.doneState.push(tmp)
      } else if (this.state) {
        console.log('else')
        this.doneState.push(this.state[i])
      }
    }

    console.log(this.doneState)
    // localStorage.setItem('doneList', JSON.stringify(this.doneState))
  }
  async knowMore() {
    let user: any = localStorage.getItem('userData');
    let flag: boolean = false;
    if (user) {
      user = JSON.parse(user)
      flag = user.click;
      this.number = user.mobileNumber;
      console.log('flag : ' + flag)
    }
    if (flag === false) {
      await this.httpService.postRequest('updateclickfield', { "mobileNumber": this.number }).pipe().subscribe((result: any) => {
        if (result.statusCode === 200) {
          console.log(result);
          user.click = true;
          localStorage.removeItem('userData');
          user = JSON.stringify(user)
          console.log(user)
          localStorage.setItem('userData',JSON.stringify(user))
        }
      }, (error) => {
        this.modalService.open(this.internetNotWorking);
      })
    }
  }
}
