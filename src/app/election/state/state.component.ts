import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxBootstrapSliderComponent, SliderComponent } from 'ngx-bootstrap-slider';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';


import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/localstorage.service';




@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class StateComponent implements OnInit {

  @ViewChild('internetNotWorking') internetNotWorking: any;
  @ViewChild('previewBtn') previewBtn: any;
  @ViewChild('sliderMove') sliderMove: any;
  @ViewChild('previewPrediciton') previewPrediction: any;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private routetocomponent: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private localstorageService: LocalstorageService
  ) { }


  public stateName: string = '';
  public active: number = 1;
  public enabled: boolean = true;
  public sliderData: SliderInterface[] = []
  public zone: boolean = false;
  public data: any;
  public totalSeat: number = 0;
  public partyName: string[] = [];
  public awadh: boolean = true;
  public purwanchal: boolean = false;
  public westUP: boolean = false;
  public bundelkhand: boolean = false;
  public previewButton: boolean = false;
  public leftAwadh: number = 118;
  public leftWestUP: number = 130;
  public leftPurwanchal: number = 120;
  public leftBundelkhand: number = 19;
  public leftState: number = 0;
  public parties: any;
  public arr: string[] = ["awadh", "purwanchal", "westUP", "bundelkhand"]
  public index: number = 1;
  public next: number = 0;
  public back: number = 0;
  public isNextBtn: boolean = true;
  public isBackBtn: boolean = false;
  public image = environment.image;
  public interval:any;


  //"BJP+": [{ 'name': 'Awadh', 'color': '#27AE60' }, { 'name': 'xyz', 'color': '#7F3DFF' }, { 'name': 'prv', 'color': '#F2AE2E' }],
  public group: any = {   
    'MP': {
      "INC": [],
      "BJP": [],
      "BSP": [],
      "Others": []
    },
    'Chhattisgarh': {
      "INC": [],
      "BJP": [], 
      "Others": []
    },
    'Rajasthan': {
      "INC": [],
      "BJP": [],
      "BSP": [],
      "Others": [],
    },
    'Mizoram': {
      "MNF": [], 
      "INC": [],
      "ZPM": [], 
      "Others": [],
    },
    'Telangana': {
      "BRS": [], 
      "INC": [],
      "BJP": [], 
      "Others": [],
    }
  }

  public groupList: any;

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(parameter => {
      this.stateName = parameter['state'];
      // console.log(this.stateName)
    })
    let lang = this.routetocomponent.url.split("/")
    // console.log(lang)
    this.localstorageService.setButtonHide(false)
    await this.httpService.postRequest('getparty', { "state": this.stateName }).pipe().subscribe((result: any) => {
      let keys;
      if (result.statusCode === 200) {

        this.totalSeat = result.message.totalSeats;
        this.leftState = this.totalSeat
        if (this.stateName === 'UP') {
          this.zone = true;
          this.data = result.message["UP"]

          keys = Object.keys(result.message[this.stateName])
          for (const k of keys) {
            for (const p of result.message[this.stateName][k]) {
              // console.log(result.message.totalSeats[0][k])
              this.sliderData.push({
                min: 0,
                size: result.message.totalSeats[0][k],
                max: result.message.totalSeats[0][k],
                value: 0,
                name: p,
                zone: k
              })
            }
          }
          // console.log(this.sliderData)

        } else {
          for (const p of result.message[this.stateName]) {
            // console.log(p)
            this.sliderData.push({
              min: 0,
              size: result.message.totalSeats,
              max: result.message.totalSeats,
              value: 0,
              name: p,
              zone: ''
            })
          }
        }
        let tmp: any = localStorage.getItem('userData');
        //console.log('########',tmp);
        if (tmp) {
          tmp = JSON.parse(tmp)
          // console.log('156 : ' + tmp[this.stateName])
          if (tmp[this.stateName] && tmp[this.stateName].length !== 0) {
            this.setData(tmp[this.stateName], keys, true)
          } else {
            // console.log('reset from loccal storage')
            let tmp2: any = localStorage.getItem(this.stateName);
            if (tmp2) {
              tmp2 = JSON.parse(tmp2);
              // console.log(tmp2)
              this.setData(tmp2.data, keys, false)
            }
          }
        } else {
          tmp = localStorage.getItem(this.stateName);
          if (tmp) {
            tmp = JSON.parse(tmp);
            // console.log(tmp)
            this.setData(tmp.data, keys, false)
          }
        }
      }
    }, (error: any) => {
      this.modalService.open(this.internetNotWorking);
    })
  }

  setTick() {
    if (this.leftAwadh === 0) {
      return 'tick';
    }
    if (this.leftPurwanchal === 0) {
      return 'tick';
    }
    if (this.leftBundelkhand === 0) {
      return 'tick';
    }
    if (this.leftWestUP === 0) {
      return 'tick';
    }
    return '';
  }

  setData(data: any, keys: any, flag: boolean) {
    if (this.stateName !== 'UP') {
      if (flag && data[0].data) {
        data = data[0].data
      } else if (flag && !data[0].data) {
        data = data[0]
      }
      // console.log(data[this.sliderData[0].name])
      for (let i = 0; i < this.sliderData.length; i++) {
        this.sliderData[i].value = data[this.sliderData[i].name]
      }
      this.leftState = this.checkSeats()
    }
    if (this.stateName === 'UP') {
      if (flag) {
        data = data[0];
      }
      for (let i = 0; i < this.sliderData.length; i++) {
        for (const k of keys) {
          let zone = this.sliderData[i].zone;
          let name = this.sliderData[i].name;
          this.sliderData[i].value = data[zone][name];
        }
      }
      this.switchTable('purwanchal', 'null')
      this.switchTable('westUP', 'null')
      this.switchTable('bundelkhand', 'null')
      this.switchTable('awadh', 'null')
    }
    let btn = this.checkSeats();
    this.leftSeats()
    if (btn === 0) this.previewButton = true;
    else this.previewButton = false

  }

  setDataLocally(data: any, keys: any) {
    if (this.stateName !== 'UP') {
      for (let i = 0; i < this.sliderData.length; i++) {
        // console.log(this.sliderData[i].name)
        // console.log(data[this.sliderData[i].name])
        this.sliderData[i].value = data[this.sliderData[i].name]
        // console.log(this.sliderData[i].value)
      }
      this.leftState = this.checkSeats()
    }
    if (this.stateName === 'UP') {
      for (let i = 0; i < this.sliderData.length; i++) {
        for (const k of keys) {
          let zone = this.sliderData[i].zone;
          let name = this.sliderData[i].name;
          this.sliderData[i].value = data[zone][name];
          // console.log(data[zone][name])
          // console.log(zone)
        }
      }
    }
    let btn = this.checkSeats();
    this.leftSeats();
    if (btn === 0) this.previewButton = true;
    else this.previewButton = false

  }

  getId(id: string) {
    let d = id.split("+")

    return d[0]

  }


  change(i: number, newValue: number, Zone?: string) {
    // console.log(this.value)

    this.changeSliderData(i, newValue)

  }

  onChange(event: any, i: any, id: string) {
    let num = 0;

    if (id == 'slider') {
      num = event;
    } else {
      num = +(<HTMLInputElement>document.getElementById("input" + i)).value
    }
    // console.log('on change 74 : ' + JSON.stringify(this.sliderData[i]))
    num = num;
    this.changeSliderData(i, num)
    // console.log('on change 80 : ' + this.sliderData[i].value)
  }

  changeSliderData(i: number, num: number, zone?: string) {
    this.sliderData[i].value = 0;
    if(this.interval) clearInterval(this.interval)
    if (this.getRemainingSeats(i) < num) {
      num = this.getRemainingSeats(i);
    }

    this.sliderData[i].value = num;
    for (let index = 0; index < this.sliderData.length; index++) {
      console.log(JSON.stringify(this.sliderData[index]))
    }
    if (this.stateName !== 'UP') {
      this.leftState = this.checkSeats()
      if (this.leftState === 0) this.previewPopUp()
    }
    if (this.stateName === 'UP') {
      if ((this.bundelkhand && this.leftBundelkhand === 0) || (this.awadh && this.leftAwadh === 0) ||
        (this.purwanchal && this.leftPurwanchal === 0) || (this.westUP && this.leftWestUP === 0)) {
        this.leftSeats();
      }
      if (this.leftBundelkhand === 0 && this.leftAwadh === 0 &&
        this.leftPurwanchal === 0 && this.leftWestUP === 0) {
        this.previewPopUp()
      }

    }

    if (this.stateName === 'UP') {
      if ((this.bundelkhand && this.leftBundelkhand === 0) || (this.awadh && this.leftAwadh === 0) ||
        (this.purwanchal && this.leftPurwanchal === 0) || (this.westUP && this.leftWestUP === 0)) {
        this.modalService.open(this.sliderMove);
      } else {
        this.leftSeats()
        if (this.leftBundelkhand === 0 && this.leftAwadh === 0 &&
          this.leftPurwanchal === 0 && this.leftWestUP === 0) {
          this.previewPopUp()
        }
      }


    }
    if (this.stateName !== 'UP' && this.previewButton && this.leftState === 0) {
      this.modalService.open(this.sliderMove)
    }
    let btn = this.checkSeats()
    if (btn === 0) this.previewButton = true;
    else this.previewButton = false
  }

  getRemainingSeats(i: number) {
    let sum = 0;
    let zone = ''
    if (this.stateName === 'UP') {
      zone = this.sliderData[i].zone;
    }
    for (let index = 0; index < this.sliderData.length; index++) {

      if (index !== i && zone === this.sliderData[index].zone) {
        sum += this.sliderData[index].value;
        // console.log(this.sliderData[index].value)
      }
    }
    if (this.stateName == 'UP') {
      return (this.sliderData[i].size - sum)
    }
    return (this.totalSeat - sum);
  }

  preview(): void {
    let num = this.checkSeats();
    console.log('num : ' + num)
    if (num !== 0) {
      this.modalService.open(this.previewBtn)
      return;
    }
    if (num < 0) {
      if(this.interval) clearInterval(this.interval) 
      return;
    }
    let zone = '';
    if (this.stateName === 'UP') {
      zone = this.sliderData[0].zone;
    }
    if (this.leftState > this.totalSeat) {
      for (let index = 0; index < this.sliderData.length; index++) {
        if (zone !== this.sliderData[index].zone) {
          this.sliderData[index].value = 0;
          zone = this.sliderData[index].zone;
        }
        this.sliderData[index].value = 0;
      }
      return;
    }
    let data: any = {
      "state": this.stateName,
      "data": ''
    }

    let vote: any = {}
    if (this.stateName === 'UP') {
      vote = { "Awadh": {}, "Purwanchal": {}, "West UP": {}, "Bundelkhand": {} }
    }

    for (let i of this.sliderData) {
      if (this.stateName === 'UP') {
        vote[i.zone][i.name] = i.value
        if (this.partyName.length === 0) {
          this.partyName.push(i.name)
        } else {
          let flag = true;
          for (let p of this.partyName) {
            if (p === i.name) flag = false;
          }
          if (flag) this.partyName.push(i.name)
        }
      } else {
        this.partyName.push(i.name)
        vote[i.name] = i.value
      }
    }
    data.data = vote;
    localStorage.setItem(this.stateName, JSON.stringify(data));
    localStorage.setItem('stateName', this.stateName)
    localStorage.setItem('partyName', JSON.stringify(this.partyName))
    if(this.interval) clearTimeout(this.interval);
    this.routetocomponent.navigate(['preview'])

  }

  checkSeats() {
    let sum = 0;
    let zone = '';
    let up = 0;
    if (this.stateName === 'UP') {
      zone = this.sliderData[0].zone;
      up += this.sliderData[0].size;
    }
    for (let index = 0; index < this.sliderData.length; index++) {
      if (this.sliderData[index].value < 0) return 1000;
      if (zone !== this.sliderData[index].zone) {
        up += this.sliderData[index].size;
        zone = this.sliderData[index].zone;
      }

      sum += this.sliderData[index].value;
    }
    if (this.stateName == 'UP') {
      return (up - sum)
    }
    return (this.totalSeat - sum);
  }

  switchTable(name: string, btn: string, i?: number) {
    // console.log('45 :   '+name,btn,i)
    if (i === 0 || i) {
      let len = this.arr.length;
      // console.log('N : ' + this.next);
      // console.log('B : ' + this.back);
      if (btn === 'next' && this.next <= 4) {
        // console.log(this.next + 1, len - 1)
        if (this.next + 1 < len - 1) {
          // console.log('if')
          this.isBackBtn = true;
          this.next = this.next + 1;
          // console.log(this.next)
          name = this.arr[this.next]
          if (this.next !== 1) this.back = this.next - 1;

        } else {
          this.back = this.next;
          name = this.arr[this.next + 1];
          this.isNextBtn = false;
          this.back = this.next;
        }
      }
      if (btn === 'back' && i !== 0) {
        if (this.back === 0) {
          this.next -= 1;
          this.back = 0;
          name = this.arr[this.next];
          if (this.next === 0) this.isBackBtn = false;
        } else {
          if (this.next + 1 < len) this.isNextBtn = true;
          this.next = this.back;
          name = this.arr[this.back];
          this.back -= 1;
        }
      }
    }
    // console.log('N : ' + this.next);
    // console.log('B : ' + this.back);
    if (name === 'awadh') {
      this.awadh = true;
      this.bundelkhand = false;
      this.westUP = false;
      this.purwanchal = false;
      this.back = 0;
      this.isBackBtn = false;
      this.next = 0;
      this.isNextBtn = true;
    }
    if (name === 'westUP') {
      this.awadh = false;
      this.bundelkhand = false;
      this.westUP = true;
      this.purwanchal = false;
      this.isBackBtn = true;
      this.next = 2;
      this.back = 1;
      this.isNextBtn = true;
      this.isBackBtn = true;
    }
    if (name === 'purwanchal') {
      this.awadh = false;
      this.bundelkhand = false;
      this.westUP = false;
      this.purwanchal = true;
      this.next = 1;
      this.isNextBtn = true;
      this.back = 0;
      this.isBackBtn = true;
    }
    if (name === 'bundelkhand') {
      this.awadh = false;
      this.bundelkhand = true;
      this.westUP = false;
      this.purwanchal = false;
      this.isNextBtn = false;
      this.isBackBtn = true;
      this.back = 2
      this.next = 2;
    }
    this.leftSeats()
  }

  leftSeats() {
    let name = this.awadh ? 'Awadh' : this.purwanchal ? 'Purwanchal' : this.westUP ? 'West UP' : this.bundelkhand ? 'Bundelkhand' : '';
    let sum = 0;
    let total = 0;
    for (let index = 0; index < this.sliderData.length; index++) {
      if (name === this.sliderData[index].zone) {
        total = this.sliderData[index].size;
        sum += this.sliderData[index].value;
      }
    }
    switch (name) {
      case 'Awadh':
        this.leftAwadh = total - sum;
        break;
      case 'Purwanchal':
        this.leftPurwanchal = total - sum;
        break;
      case 'West UP':
        this.leftWestUP = total - sum;
        break;
      case 'Bundelkhand':
        this.leftBundelkhand = total - sum;
    }
  }

  previewPopUp() {
    this.interval = setTimeout(() => {
      this.modalService.open(this.previewPrediction)
    }, 5000)
  }

  getGroup(zone: string, name: string) {
    // console.log(this.group)
    // console.log(zone)
    // console.log(name)
    // $('.font_arrange').collapse()
    this.groupList = this.group[this.stateName][zone][name]

  }
}

interface SliderInterface {
  min: number,
  value: number,
  max: number,
  name: string,
  size: number,
  zone: string,

}
