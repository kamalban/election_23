import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private route: Router,
  ) { }

  form: FormGroup = this.fb.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  });

  public num: any;


  ngOnInit(): void {
    this.getNumber()
  }

  async saveForm() {
    console.log(this.form.value)
    if(this.form.valid){
      await this.httpService.postRequest('saveformdata', { "mobileNumber": this.num, "form": this.form.value }).pipe().subscribe((result: any) => {
        if (result.statusCode === 200) {
          console.log('ok')
          this.route.navigateByUrl('state')
        }
      }
      // }, (err: any) => {
      //   this.modalService.open(this.internetNotWorking);
      // }
      )
    }
    
  }

  getNumber(){
    let user:any = localStorage.getItem('userData');
    if(user) {
      user = JSON.parse(user)
      this.num = String(user.mobileNumber);
      console.log(this.num)
      
    }
  }

}
