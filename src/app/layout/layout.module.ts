import {CGRatesService} from '../shared/services/cgrates.service';
import {JsonrpcService} from '../shared/services/jsonrpc.service';
import {LoggerService} from '../shared/services/logger.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    NgbAlertModule.forRoot(),
    NgbDropdownModule.forRoot()
  ],
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
  providers: [
    LoggerService,
    JsonrpcService,
    CGRatesService
  ]
})
export class LayoutModule {}
