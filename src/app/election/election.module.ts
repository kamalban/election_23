import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TComponent } from './t/t.component';
import { SelectStateComponent } from './select-state/select-state.component';
import { Route, RouterModule } from '@angular/router';
import { StateComponent } from './state/state.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { VerifynumberComponent } from './verifynumber/verifynumber.component';
import { CongratulationComponent } from './congratulation/congratulation.component';
import { SwiperModule } from 'swiper/angular';
import { RankComponent } from './rank/rank.component';
import { NgApexchartsModule } from "ng-apexcharts";

import { TipsComponent } from './tips/tips.component';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';
import { TermComponent } from './term/term.component';
import { PrizeComponent } from './prize/prize.component';
import { FormComponent } from './form/form.component';
import { FaqComponent } from './faq/faq.component';

const route: Route[] = [
  {
    path: 'home',
    component: TComponent
  },
  {
    path: 'state',
    component: SelectStateComponent
  },
  {
    path: 's_state',
    component: StateComponent
  },
  {
    path: 'preview',
    component: ViewComponent
  },
  {
    path: 'verify',
    component: VerifynumberComponent
  },
  {
    path: 'congratulation',
    component: CongratulationComponent
  },
  {
    path: 'rank',
    component: RankComponent
  },
  {
    path: 'tips',
    component: TipsComponent
  },
  {
    path: 'howtoplay',
    component: HowtoplayComponent
  },
  {
    path: 'term',
    component: TermComponent
  },
  {
    path: 'prize',
    component: PrizeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  }
  
]

@NgModule({
  declarations: [
    TComponent,
    SelectStateComponent,
    StateComponent,
    ViewComponent,
    VerifynumberComponent,
    CongratulationComponent,
    RankComponent,
    TipsComponent,
    HowtoplayComponent,
    TermComponent,
    PrizeComponent,
    FormComponent,
    FaqComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    NgbModule,
    NgxBootstrapSliderModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    // ChartsModule
    NgApexchartsModule
  ]
})
export class ElectionModule { }
