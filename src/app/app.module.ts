import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ElectionModule } from './election/election.module';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpInterceptorService } from './http-interceptor.service';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData, HashLocationStrategy } from '@angular/common';
import localeHi from '@angular/common/locales/hi';
import { SwiperModule } from 'swiper/angular';
import { NgApexchartsModule } from "ng-apexcharts";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localeHi);

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ElectionModule,
    HttpClientModule,
    NgbModule,
    NgxBootstrapSliderModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient] }
    }),
    
    SwiperModule,
    // ChartsModule
    NgApexchartsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  },
  {provide: registerLocaleData, useClass: HashLocationStrategy},
  { provide: LOCALE_ID, useValue: 'hi' },
    HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
