import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = environment.url;
  constructor(private http: HttpClient) { }
  getRequest(url: any) {
    return this.http.get(`${this.url}${url}`)
  }
  postRequest(url: any, data:any) {
    return this.http.post(this.url + url, data)
  }
}