import {environment} from '../../../environments/environment';
import {JsonRpcRequest} from '../entities/JsonRpcRequest';
import {LoggerService} from './logger.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonrpcService {

  constructor(
    private _http: HttpClient,
    private _logger: LoggerService
  ) {}

  sendJsonRpc(_method: string, _attr: any): any {

    const url = environment.rpcserviceurl;

    const jsonrpc = new JsonRpcRequest(_method, _attr);

    //console.log(_method + ' Request: ' + JSON.stringify(jsonrpc));
    return this._http.post(url, JSON.stringify(jsonrpc))
      .toPromise()
      .then((res) => {
        const response = res;
        //console.log(_method + ' Response: ' + JSON.stringify(response));
        if (response['result'] === null) {
          //this._logger.error(_method + ':' + response['error']);
          return this.handleError(_method + ': ' + response['error']);
        } else {
          return response['result'];
        }
      })
      .catch(this.handleError);


  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
