import {Message} from '../shared/entities/Message';
import {LoggerService} from '../shared/services/logger.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  msgs: Message[] = [];

  constructor(private _logger: LoggerService) {}

  ngOnInit() {
    // once there is a log , show it
    this._logger.logEvent.subscribe(
      (log: Message) => {
        this.showLog(log, 15000);
      }
    );

    // this.showLog({severity: 'success', summary: 'Success: ', detail: "Application loaded"}, 10000);
  }
  public showLog(log: Message, timeout: number) {

    this.msgs.push(log);
    setTimeout(() => {
      this.msgs.pop();
    }, timeout);
  }

  public closeAlert(msg: any) {
        const index: number = this.msgs.indexOf(msg);
        this.msgs.splice(index, 1);
    }
  
  ngOnDestroy() {
    this._logger.logEvent.unsubscribe();
  }

}
