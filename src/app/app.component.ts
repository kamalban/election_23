import { Component, LOCALE_ID, Inject } from '@angular/core';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'election_ke_baazigar';
  constructor(private route: Router,
    @Inject(LOCALE_ID) protected localeId: string,
    private router: ActivatedRoute,
    private location: Location
  ) {

  }
  public language: string = ''
  ngOnInit() {
    console.log('init....')
    console.log(this.route.url)
    console.log(this.location.path())
    // this.roung
    this.route.navigateByUrl('home')
    this.setUpAnalytics()
  }
  setUpAnalytics() {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        console.log(' setup analytics')
        gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
        })

      })
  }
}
