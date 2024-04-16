import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  localStorageData = new Subject<any>()
  buttonHide = new Subject<any>()

  constructor() { }

  setItem(key:string, data:any){
    // localStorage.next()
    
    localStorage.setItem(key,JSON.stringify(data))
    this.localStorageData.next(data)

  }
  getItem(key:string){

  }

  setButtonHide(value: boolean){
    this.buttonHide.next(value)
  }
}
