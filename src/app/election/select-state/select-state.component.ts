import { state } from '@angular/animations';
import { Component, OnInit, ViewChild ,ViewEncapsulation} from '@angular/core';
import { HttpService } from 'src/app/http.service';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-state',
  templateUrl: './select-state.component.html',
  styleUrls: ['./select-state.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class SelectStateComponent implements OnInit {
  
  @ViewChild('internetNotWorking') internetNotWorking:any;
  constructor(private router: Router, private httpService: HttpService,
    private modalService: NgbModal,
  ) { }

  state: string[] = [];
  stateFlag: number = 0;
  public doneState: string[] = []
  public data: any; 
  public image = environment.image

  async ngOnInit(): Promise<void> {     
    this.router.navigate(['/s_state',{'state':'Chhattisgarh'}]); 
    console.log('url : '+this.image)
    await this.httpService.postRequest('stateList', '').pipe().subscribe((result: any) => {
      if (result) {
        // console.log(JSON.parse(result))
        result = JSON.parse(result.message)
        console.log(result)
        this.state = result.state;
        this.stateFlag = this.state.length;
        localStorage.setItem('state',JSON.stringify(this.state));
        localStorage.setItem('cutOffDate',JSON.stringify(result.cutOffDate))
        let userData: any = localStorage.getItem('userData') || '';
        if(userData){
        userData = JSON.parse(userData);

        }
        if(result.userData) {
          
          this.data = result.userData;
          console.log(this.data["MP"].length)

          localStorage.setItem('userData',JSON.stringify(result.userData))
          
          this.setDoneStateList()
        } else if(userData){
          this.data = userData;
          this.setDoneStateList()
        } 
        else {
          this.doneState = this.state
        }
      }


    },(error)=>{
      this.modalService.open(this.internetNotWorking);
    })
  }
 

  setClass(index: number) {
    if (index % 2 == 0 && index !== 0)
      return "w-100"
    else
      return ""

  }

  setDoneStateList(){
    for(let i=0;i < this.state.length;i++){
      console.log('loop')
      if(this.data[this.state[i]] && this.data[this.state[i]].length !== 0){
        console.log('tck')
        let tmp = 'Checked-'+this.state[i];
        console.log(tmp)
        this.doneState.push(tmp)
      }else if(this.state){
        console.log('else')
        this.doneState.push(this.state[i])
      }
    }
    
    console.log(this.doneState)
    localStorage.setItem('doneList',JSON.stringify(this.doneState))
  }
}
