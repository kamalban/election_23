import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  private AUTH_HEADER = "Authorization";
  private token: string = '';
  
  constructor() { }
  
  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = localStorage.getItem('token') || '';
    if (this.token) {
      this.token = this.token.substring(1,this.token.length-1)
      let duplicate = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
      duplicate = this.addAuthenticationToken(duplicate);
      return next.handle(duplicate);
    }
    return next.handle(req);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    console.log('set headers')
   
    if (!this.token) {
      return request;
    }
    console.log('token...... '+this.token)
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }
}
