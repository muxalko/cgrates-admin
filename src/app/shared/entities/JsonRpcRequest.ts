import {UUID} from 'angular2-uuid';

export class JsonRpcRequest {
  id: string = UUID.UUID();
  method: string;
  params: Array<any> = new Array();

  constructor(_method: string, _params: any) {
    this.method = _method;
    this.params.push(_params);
  }
}
