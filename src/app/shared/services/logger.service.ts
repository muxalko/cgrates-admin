import { Message } from '../entities/Message';
import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class LoggerService {

  public logEvent: EventEmitter<Message> = new EventEmitter<Message>();

  public success(log: any) {
    console.log('Logger success: ', JSON.stringify(log));
    const _log: Message = {severity: 'success', summary: 'Success: ', detail: log };
    this.logEvent.emit(_log);
  }
  
   public info(log: any) {
    console.log('Logger info:: ', JSON.stringify(log));
    const _log: Message = {severity: 'info', summary: 'Info: ', detail: log };
    this.logEvent.emit(_log);
  }

  public warning(log: any) {
    console.log('Logger warning: ', JSON.stringify(log));
    const _log: Message = {severity: 'warning', summary: 'Warning: ', detail: log};
    this.logEvent.emit(_log);
  }

  public error(log: any) {
    console.log('Logger error: ', JSON.stringify(log));
    const _log: Message = {severity: 'danger', summary: 'Error: ', detail: log};
    this.logEvent.emit(_log);
  }

  public setLog(log: any) {
    console.log('Logger: ', JSON.stringify(log));

    /*
    let logMsg = log
    let color = log._body === undefined ? 'green' : 'red';
    if (color === 'red') {
      try {
        let parseLogMsg = JSON.parse(log._body);
        logMsg = (parseLogMsg.result) ? parseLogMsg.result :
          (parseLogMsg.errorMessage) ? parseLogMsg.errorMessage :
            log._body;
      } catch (e) {
        logMsg = 'An error occurred please contact administrator';
      }
    }
    /*
    /*
    let logMsg = (log._body) ?  (log._body.errorMessage) ? `${log._body.errorMessage} - ${log._body.errorCause}` :
                 (log._body.result) ? log._body.result :
                 (log.message) ? log.message :
                 //(log.status) ? `${log.status} - ${log.statusText}` :
                  JSON.stringify(log._body) : JSON.stringify(log);
    */

    // Error log example
    // {"_body":"{\"errorCode\":404,\"type\":\"UNKNOWN\",
    //  \"errorMessage\":\"No coupons exists\",
    //  \"errorCause\":\"com.michael.coupons.exceptions.ApplicationException\",
    //  \"methodSource\":\"CouponResource.java:193(getAllCoupons)\"}",
    //  "status":520,"ok":false,"statusText":"OK",
    // "headers":{"date":["Sun"," 18 Sep 2016 21:50:27 GMT"],
    // "content-length":["192"],"content-type":["application/json"]},
    // "type":2,"url":"https://37.26.145.46:8443/CouponWeb/rest/coupons"}

    // toast( logMsg, 10000, color + ' rounded');

    this.logEvent.emit(log);

  }


}
