import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule as Ng2Charts} from 'ng2-charts';

import {AccountsRoutingModule} from './accounts-routing.module';
import {AccountsComponent} from './accounts.component';
import {PageHeaderModule} from '../../shared';
import {DataPipe} from '../../shared/pipes/data';
import {KeysPipe} from '../../shared/pipes/keys';
import {VoicePipe} from '../../shared/pipes/voice';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTableModule} from 'ngx-datatable-bootstrap4';
import {AccountModule} from '../../shared';
import {AccountComponent} from '../../shared/modules/account/account.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Charts,
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
    DataTableModule,
    AccountsRoutingModule,
    PageHeaderModule,
    AccountModule
  ],
  declarations: [
    AccountsComponent,
    DataPipe,
    VoicePipe,
    KeysPipe],
  entryComponents: [AccountComponent]
})
export class AccountsModule {}
