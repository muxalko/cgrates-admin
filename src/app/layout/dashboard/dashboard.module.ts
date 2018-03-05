import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCarouselModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent,
  CacheStatsComponent
} from './components';
import {StatModule} from '../../shared';
import { CGRatesService } from '../../shared/services/cgrates.service';
import { LoggerService } from '../../shared/services/logger.service';

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    DashboardRoutingModule,
    StatModule
  ],
  declarations: [
    DashboardComponent,
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    CacheStatsComponent
  ],
  providers: [
    LoggerService,
    CGRatesService
  ]
})
export class DashboardModule {}
