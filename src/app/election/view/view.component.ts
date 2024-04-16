import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { ApexOptions } from 'ng-apexcharts'
import { LocalstorageService } from 'src/app/localstorage.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[]
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class ViewComponent implements OnInit {


  public barDiagram: any = {}

  @ViewChild('internetNotWorking') internetNotWorking: any;
  @ViewChild('failedUpdate') failedUpdate: any;
  constructor(private route: Router,
    private actRoute: ActivatedRoute,
    private httpService: HttpService,
    private modalService: NgbModal,
    private localStorageService: LocalstorageService
  ) {
  }

  public state: string = '';
  public stateName: string[] = [];
  public partyName: string[] = [];
  public data: any;
  public zones: string[] = [];
  public totalZoneWise: any = { "Awadh": 0, "Purwanchal": 0, "West UP": 0, "Bundelkhand": 0 };
  public total: number = 0;
  public otherTotal: number = 0;
  public totalpartyWise: number[] = [];
  public number: string = '';
  public update: boolean = false;
  public oldData: any;
  public image = environment.image
  public partyCSS: any[] = [];

  public color: any = {
    "UP": {
      "BJP+": "#F65354",
      "SP+": "#F2AE2E",
      "BSP": "#27AE60",
      "INC": "#7F3DFF",
      "Others": "#25386F",
    },
   
    "Rajasthan": {
      "INC": "#F65354",
      "BJP": "#7F3DFF",       
      "BSP": "#27AE60",
      "Others": "#25386F",
    },
    "Chhattisgarh": {
      "INC": "#F65354",
      "BJP": "#7F3DFF", 
      "Others": "#25386F",
    },
    "MP": {
      "INC": "#F65354",
      "BJP": "#7F3DFF",       
      "BSP": "#27AE60",
      "Others": "#25386F",
    },
    "Mizoram": {
      "INC": "#F65354",
      "MNF": "#7F3DFF",       
      "ZPM": "#27AE60",
      "Others": "#25386F",
    },
    "Telangana": {
      "INC": "#F65354",
      "BJP": "#7F3DFF",       
      "BRS": "#27AE60",
      "Others": "#25386F",
    }
  }

  public nameParty: any = {
    "UP": ["BJP+", "SP+", "BSP", "INC", "Others"],
    "Rajasthan": ["INC", "BJP", "BSP", "Others"],
    "Chhattisgarh": ["INC", "BJP", "AAP", "Others"],
    "MP": ["INC", "BJP", "BSP", "Others"],
    "Mizoram": ["INC", "MNF", "ZPM",  "Others"],
    "Telangana": ["INC", "BRS",  "BJP", "Others"]

  }

  // "#F65354", //1
  // "#F2AE2E", //2
  // "#27AE60", //3
  // "#7F3DFF", //4
  // "#25386F", //5
  // "#546E7A", //6
  // "#26a69a", //7
  // "#D10CE8" //8
  ngOnInit(): void {
    this.localStorageService.setButtonHide(true)
    this.state = localStorage.getItem('stateName') || '';
    let data: any = localStorage.getItem('userData') || '';
    if (this.state === '') {

      this.actRoute.params.subscribe(parameter => {
        this.state = parameter['state'];
        // console.log(this.stateName)
      })
    }
    let party = localStorage.getItem('partyName');
    console.log(this.state)
    console.log(party)
    if (party !== null) {
      this.partyName = JSON.parse(party)
      for (let p of this.partyName) {
        let tmp = { "name": p, 'color': this.color[this.state][p] };
        this.partyCSS.push(tmp)
      }
      console.log(this.partyCSS)
    }
    if (!party) {
      if (data) {
        data = JSON.parse(data);
      }
      this.partyName = this.nameParty[this.state];
      for (let p of this.partyName) {
        let tmp = { "name": p, 'color': this.color[this.state][p] };
        this.partyCSS.push(tmp);
      }
      let setData = { "state": this.state, "data": data[this.state][0] }
      localStorage.setItem(this.state, JSON.stringify(setData))
    }
    if (this.state === 'UP') {
      this.setUPStateData()
    } else {
      this.setOtherStateData()
    }
    this.getChart()
  }

  setUPStateData() {
    let d = localStorage.getItem(this.state) || '';
    d = JSON.parse(d)
    this.data = d;
    console.log(this.data)
    this.sumZoneWise();
    this.sumPartyWise();
  }

  setOtherStateData() {
    let d = localStorage.getItem(this.state) || '';
    d = JSON.parse(d)
    this.data = d;
    console.log(this.data)
    this.sumPartyWise()
  }
  async nextState(forceUpdate: any) {
    let token = localStorage.getItem('token') || '';
    console.log('nextstate')
    if (token.length === 0) {
      this.route.navigateByUrl('verify')
    } else {
      console.log('el')
      let user: any = localStorage.getItem('userData') || '';
      if (user) {
        user = JSON.parse(user)
      }
      let name = this.state
      console.log(user)

      console.log(name)
      console.log(user[name].length)
      this.number = user["mobileNumber"].toString()
      // if (user[name].length === 0) {
      this.overrideTeamdata()
      // } else {
      //   this.forceUpdatePopUp(forceUpdate)
      // }

    }

  }

  getChart() {
    console.log(this.totalpartyWise)

    this.barDiagram = {
      series: [
        {
          name: "Seats",
          data: this.totalpartyWise
        }
      ],
      chart: {
        height: 200,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#F65354",
        "#F2AE2E",
        "#27AE60",
        "#7F3DFF",
        "#25386F",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          },
          // columnWidth: "10%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,

        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: [
            "#F65354",
            "#F2AE2E",
            "#27AE60",
            "#7F3DFF",
            "#25386F",
            "#546E7A",
            "#26a69a",
            "#D10CE8"
          ],
        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.partyName,
        labels: {
          style: {
            colors: [
              "#F65354",
              "#F2AE2E",
              "#27AE60",
              "#7F3DFF",
              "#25386F",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "10px"
          }
        }
      }
    };
  }
  sumZoneWise() {
    for (let p of this.partyName) {
      console.log(this.data.data["Awadh"][p])
      this.totalZoneWise["Awadh"] += this.data.data["Awadh"][p];
      this.totalZoneWise["Purwanchal"] += this.data.data["Purwanchal"][p];
      this.totalZoneWise["West UP"] += this.data.data["West UP"][p];
      this.totalZoneWise["Bundelkhand"] += this.data.data["Bundelkhand"][p];
    }
    console.log(this.totalZoneWise)

    this.total += this.totalZoneWise["Awadh"];
    this.total += this.totalZoneWise["Purwanchal"];
    this.total += this.totalZoneWise["West UP"];
    this.total += this.totalZoneWise["Bundelkhand"];
  }

  sumPartyWise() {
    console.group('statename : ' + this.state)
    if (this.state === 'UP') {
      let zone = ["Awadh", "Purwanchal", "West UP", "Bundelkhand"]

      for (let p of this.partyName) {
        let sum = 0;
        for (let z of zone) {
          sum += this.data.data[z][p]
        }
        console.log(sum)
        // let chart = {'data': [sum], 'label': p}
        // this.barChartData.push(chart)
        this.totalpartyWise.push(sum);
      }
      console.log(this.totalpartyWise)
    } else {
      let totalsum = 0;
      console.log(this.data)
      for (let p of this.partyName) {
        let sum = 0;
        sum += this.data.data[p]
        totalsum += this.data.data[p]
        console.log(sum)
        // let chart = {'data': [sum], 'label': p}
        // this.barChartData.push(chart)
        this.totalpartyWise.push(sum);
      }
      this.otherTotal = totalsum;
      console.log(this.totalpartyWise)
    }
  }

  forceUpdatePopUp(param: any) {
    this.modalService.open(param);
  }

  async overrideTeamdata() {
    console.log('1')
    let tmp: any = localStorage.getItem(this.state) || '';
    tmp = JSON.parse(tmp)
    this.update = true;
    let data: any = {};
    if (tmp) {
      this.oldData = tmp["data"]
    }
    console.log('err')
    await this.httpService.postRequest('updateteamdata',
      {
        "mobileNumber": this.number,
        "state": this.state,
        "data": this.oldData,
        "flag": this.update
      }).pipe().subscribe((result: any) => {
        console.log(result)
        if (result.statusCode === 200) {
          let tmp: any = localStorage.getItem('doneList')
          let doneList: string[] = [];
          console.log(tmp)
          if (tmp) {
            doneList = JSON.parse(tmp)
            console.log(doneList)
            localStorage.removeItem('doneList')
            console.log('remove')

            for (let s = 0; s < doneList.length; s++) {
              if (this.state === doneList[s]) {
                doneList[s] = 'Checked-' + doneList[s]
              }
            }
            console.log('g')
            localStorage.setItem('doneList', JSON.stringify(doneList))
            console.log('h')

          }
          this.route.navigateByUrl('congratulation')
        }
      }, (error) => {
        console.log('erro function.')
        console.log(error.error)
        if (error.error.statusCode === 400) {
          if (error.error.message === 'Time Out') {
            // alert('you cant update your team now.')
            console.log('you cant update your team now.')
            this.modalService.open(this.failedUpdate)
          }
        } else {
          this.modalService.open(this.internetNotWorking);
        }
      })
  }
}
