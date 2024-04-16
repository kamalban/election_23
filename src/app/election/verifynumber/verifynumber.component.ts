import { Component, OnInit, Directive, ElementRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { LocalstorageService } from '../../localstorage.service';
import { environment } from 'src/environments/environment';
import { IfStmt } from '@angular/compiler';



@Component({
  selector: 'app-verifynumber',
  templateUrl: './verifynumber.component.html',
  styleUrls: ['./verifynumber.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class VerifynumberComponent implements OnInit {

  public number: string = '';
  public otp: string = ''
  public update: boolean = false;
  public isOldData: boolean = false;
  public oldData: any;
  public state: string = '';
  public doneState: string[] = []
  public num1: string = '';
  public num2: string = '';
  public num3: string = '';
  public num4: string = '';
  public data: any; //set user data when opt is verified
  public stateList: string[] = []
  public minute: number = 2;
  public seconds: number = 59;
  public image = environment.image
  public onlyLogin: boolean = false;

  @ViewChild('internetNotWorking') internetNotWorking: any;
  @ViewChild('failedUpdate') failedUpdate: any;
  @ViewChild('registrationClosed') registrationClosed: any;

  constructor(private route: Router,
    private routeParam: ActivatedRoute,
    private httpService: HttpService,
    private modalService: NgbModal,
    private otpModalService: NgbModal,
    private config: NgbModalConfig,
    private localstorageService: LocalstorageService,
    private host: ElementRef
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public flag: boolean = true
  ngOnInit(): void {
    console.log(this.number)
    this.routeParam.params.subscribe(parameter => {
      this.onlyLogin = parameter['user'] || false;
    })
  }

  async sendNumber(param: any) {
    console.log(this.number)
    if (this.number.length !== 10) {
      this.invalidMobileNumberPopUp(param)
      return;
    }
    console.log(typeof param);

    console.log('num is : ' + isNaN(Number(this.number)))
    if (isNaN(Number(this.number))) {
      //console.log('here enter===',param);
      this.invalidMobileNumberPopUp(param)
      return;
    } 

    await this.httpService.postRequest('generateotp', { "mobileNumber": this.number }).pipe().subscribe((result: any) => {
      // console.log(result)
      // if(result.message) {
      //   alert(result.message)
      // }
      if (result.statusCode === 200) {
        this.flag = false;
      }
    }, (error) => {
      console.log('kamllllllll',error);
      if (error.error.message === 'Registration closed') {
        console.log('error msgggggggggggg');
        this.modalService.open(this.registrationClosed)
      } 
    })
    this.startTimer()
  }

  backToMobileNumber() {
    this.flag = true;
  }
  async resendOTP(param: any) {
    await this.httpService.postRequest('generateotp', { "mobileNumber": this.number }).pipe().subscribe((result: any) => {
      // console.log(result)
      // console.log('otp')
      // if(result.message) {
      //   alert(result.message)
      // }
      if (result.statusCode === 200) {
        this.flag = false;
        this.optSendPopUP(param)
        this.seconds = 59;
        this.minute = 2;

      }
    }, (error) => {
      this.modalService.open(this.internetNotWorking);
    })
    this.startTimer()
  }
  async sendOTP(overwrite?: any, otp?: any) {
    this.otp = this.num1 + this.num2 + this.num3 + this.num4;
    console.log(this.otp)

    await this.httpService.postRequest('verifyotp', { "mobileNumber": this.number, "otp": this.otp }).pipe().subscribe(async (result: any) => {
      console.log(result)
      if (result.statusCode === 200) {
        console.log('right')
        console.log('user : ' + this.onlyLogin)
        let data = JSON.parse(result.message)
        console.log(data)
        console.log('token get')
        this.data = data.userData
        console.log(this.data)
        localStorage.setItem('Number', this.number)

        this.localstorageService.setItem('token', data.token)
        // localStorage.setItem('token', result.message)

        this.state = localStorage.getItem('stateName') || ''; 9
        localStorage.setItem('userData', JSON.stringify(data.userData))
        let datas: any = localStorage.getItem('userData') || '';
        console.log('user data ' + datas)
        if (datas !== '') {
          datas = JSON.parse(datas)
          this.update = true;

          if (this.onlyLogin) this.backToHome()
          if (datas[this.state].length !== 0) {
            console.log('9')
            this.forceUpdatePopUp(overwrite)
            console.log('0')
          }
          else {
            console.log('length is 0')
            let newData: any = localStorage.getItem(this.state);
            if (newData) {
              newData = JSON.parse(newData)
              console.log(newData)
              if (newData.data) {
                newData = newData.data
              }
              await this.httpService.postRequest('updateteamdata',
                {
                  "mobileNumber": this.number,
                  "state": this.state,
                  "data": newData,
                  "flag": false
                }).pipe().subscribe((result: any) => {
                  console.log(result)
                  if (result.statusCode === 200) {
                    console.log('congrts')
                    console.log(this.data)
                    this.setDoneStateList()
                    this.route.navigate(['congratulation'])
                  }
                }, (error) => {
                  this.timeOutError(error)
                  this.modalService.open(this.internetNotWorking);
                })
            }

          }
        } else {
          let tmp: any = localStorage.getItem(this.state) || '';
          tmp = JSON.parse(tmp)

          if (tmp) {
            this.oldData = tmp["data"]
          }

          this.update = true;
          if (this.onlyLogin) this.backToHome()
          await this.httpService.postRequest('updateteamdata',
            {
              "mobileNumber": this.number,
              "state": this.state,
              "data": this.oldData,
              "flag": this.update
            }).pipe().subscribe((result: any) => {
              console.log(result)
              if (result.statusCode === 200) {
                console.log('congrts')
                this.route.navigate(['congratulation'])
              }
            },
              (error) => {
                console.log(error)
                this.timeOutError(error)
                this.modalService.open(this.internetNotWorking);
              })
        }

      }


    }, (error) => {
      console.log(error)
      console.log(error.error.message)
      if (error.error.message === 'not valid') {
        this.invalidOTPPopUp(otp)
      } else {
        this.modalService.open(this.internetNotWorking);
      }
    })
  }

  forceUpdatePopUp(param: any) {
    this.modalService.open(param);
  }

  async overrideTeamdata() {
    let tmp: any = localStorage.getItem(this.state) || '';
    tmp = JSON.parse(tmp)

    let data: any = {};
    if (tmp) {
      this.oldData = tmp["data"]
    }
    await this.httpService.postRequest('updateteamdata',
      {
        "mobileNumber": this.number,
        "state": this.state,
        "data": this.oldData,
        "flag": this.update
      }).pipe().subscribe((result: any) => {
        console.log(result)
        this.route.navigate(['congratulation'])
      }, (error) => {
        this.timeOutError(error)
      })
  }

  invalidOTPPopUp(param: any) {
    this.otpModalService.open(param);
  }

  invalidMobileNumberPopUp(param: any) {
    this.otpModalService.open(param);
  }
  optSendPopUP(param: any) {
    this.otpModalService.open(param)
  }
  setDoneStateList() {
    let tmp: any = localStorage.getItem('state')
    if (tmp) {
      tmp = JSON.parse(tmp)
      this.stateList = tmp;
      for (let i = 0; i < this.stateList.length; i++) {
        console.log('loop')
        if ((this.data[this.stateList[i]] && this.data[this.stateList[i]].length !== 0) || this.state === this.stateList[i]) {
          console.log('tck')
          let tmp = 'Checked-' + this.stateList[i];
          console.log(tmp)
          this.doneState.push(tmp)
        } else if (this.stateList) {
          console.log('else')
          this.doneState.push(this.stateList[i])
        }
      }

      console.log(this.doneState)
      localStorage.setItem('doneList', JSON.stringify(this.doneState))
    }

  }

  startTimer() {
    let tmp = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.seconds = 60;
        this.minute -= 1
      }
      if (this.minute <= 0 && this.seconds === 0) {
        clearInterval(tmp);
      }
    }, 1000)
  }
  clickEvent(data: any, first: any, last: any) {
    console.log('in')
    console.log(data)

    if (data.key.toUpperCase() == 'BACKSPACE') {
      document.getElementById(first)?.focus();

    } else
      // if(first)
      document.getElementById(last)?.focus();
  }

  timeOutError(error: any) {
    if (error.error.statusCode === 400) {
      if (error.error.message === 'Time Out') {
        // alert('you cant update your team now.')
        console.log('you cant update your team now.')
        this.modalService.open(this.failedUpdate)
      }
    }
  }

  backToHome() {
    this.route.navigate(['/home'])
  }
}
