import {Component, OnInit, TemplateRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {Account, AccountActionTiming, AttrGetAccount, ExternalCDR, ActiveSession, AttrSetAccount, AttrSetBalance, AttrGetCdrs, Paginator} from '../../shared/entities/cgrates/Types';
import {CGRatesService} from '../../shared/services/cgrates.service';
import {LoggerService} from '../../shared/services/logger.service';
import {DataTableResource, DataTableParams, DataTableTranslations} from 'ngx-datatable-bootstrap4';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AccountComponent} from '../../shared/modules/account/account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [routerTransition()]
})
export class AccountsComponent implements OnInit {

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  closeResult: string;

  currentItem: any;
  search: AttrGetAccount;
  currentCategory = '';

  paginationLimit: number;
  paginationOffset: number;

  defaultPagination: number;
  advancedPagination: number;
  paginationSize: number;
  disabledPagination: number;
  isPaginationDisabled: boolean;

  cdrs: ExternalCDR[] = new Array();
  cdrCount = 0;

  cdrResource = new DataTableResource(this.cdrs);
  // @ViewChild(DataTable) cdrsTable;


  accountActiveSessions: ActiveSession[] = new Array();
  accountActiveSessionsCount = 0;


  accountActiveSessionsResource = new DataTableResource(this.accountActiveSessions);
  // @ViewChild(DataTable) accountActiveSessionsTabl

  accounts: Account[] = new Array();
  accountActionPlan: AccountActionTiming[] = new Array();

  actionplansIds: string[];
  actiontriggersIds: string[];

  // special params:

  balanceStyle = {//new Map<string, string>();
    '*monetary': 'bg-danger',
    '*voice': 'bg-success',
    '*sms': 'bg-warning',
    '*data': 'bg-info',
    '*generic': 'card-info'
  };

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
  ];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales'
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  // Radar
  public radarChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ];
  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType: string = 'radar';

  // Pie
  public pieChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales'
  ];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales',
    'Telesales',
    'Corporate Sales'
  ];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend: boolean = true;

  public polarAreaChartType: string = 'polarArea';

  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  constructor(
    private modalService: NgbModal,
    private _cgratesService: CGRatesService,
    private _logger: LoggerService
  ) {

    this.paginationLimit = 10;
    this.paginationOffset = 0;
    this.defaultPagination = 1;
    this.advancedPagination = 1;
    this.paginationSize = 1;
    this.disabledPagination = 1;
    this.isPaginationDisabled = true;
  }

  toggleDisabled() {
    this.isPaginationDisabled = !this.isPaginationDisabled;
  }

  getAccounts() {
    this._cgratesService.setLimit(this.paginationLimit);
    this._cgratesService.setOffset(this.paginationOffset);
    this._cgratesService.GetAccounts()
      .then((response) => {
        this.accounts = response;
      })
      .catch(err => {
        this._logger.error(err);
      });
  }

  getAccount(_tenant: string, _account: string) {
    this._cgratesService.GetAccount(_tenant, _account)
      .then((response) => {
        if (response !== undefined) {
          this.currentItem = response;
          this.GetAccountActionPlan();
          this.GetActiveSessions();
        }
      })
      .catch(err => {
        this._logger.error(err);
      });
  }

  getAcc(_tenant: string, _account: string) {
    console.log('GetAccount:' + _tenant + ':' + _account)
    this.getAccount(_tenant, _account);
    setTimeout(() => {this.getAccount(_tenant, _account);}, 5000);
  }



  GetActiveSessions() {
    let _tmp = this.currentItem.ID.split(':');
    let _tenant = _tmp[0];
    let _account = _tmp[1];
    this.accountActionPlan = new Array();
    this._cgratesService.GetActiveSessions(_tenant, _account)
      .then((response) => {
        this.accountActiveSessions = response;
      })
      .catch(err => {
        this._logger.error(err);
      });
  }


  GetAccountActionPlan() {
    let _tmp = this.currentItem.ID.split(':');
    let _tenant = _tmp[0];
    let _account = _tmp[1];
    this._cgratesService.GetAccountActionPlan(_tenant, _account)
      .then((response) => {
        this.accountActionPlan = response;
      })
      .catch(err => {
        this._logger.error(err);
      });
  }

  getActionPlanIds() {
    this._cgratesService.GetTPActionPlanIds()
      .then((response) => {
        this.actionplansIds = response;
      })
      .catch(err => {
        this._logger.error(err);
      });
  }

  getActionTriggerIds() {
    this._cgratesService.GetTPActionTriggerIds()
      .then((response) => {
        this.actiontriggersIds = response;
      })
      .catch(err => {
        this._logger.error(err);
      });
  }

  ngOnInit() {

    this.getAccounts();
    this.currentItem = new Account();
    this.search = new AttrGetAccount('golant', '972585577773');

    // reload if TPid is changed
    this._cgratesService.tpidEvent.subscribe(
      (tpidChange: string) => {
        this.reload();
      }
    );

  }

  reload() {
    this.accounts = new Array();
    this.accountActionPlan = new Array();
    this.accountActiveSessions = new Array();
    this.getAccounts();
  }

  newItem() {
    this.currentItem = new AttrSetAccount();
    this.getActionPlanIds();
    this.getActionTriggerIds();
    //this.details.open();
  }

  openItem(_item: any) {
    this.currentItem = _item;
    let _tmp = this.currentItem.ID.split(':');
    let _tenant = _tmp[0];
    let _account = _tmp[1];
    this.search.Tenant = _tenant;
    this.search.Account = _account;
  }

  editAccount() {
    this.GetAccountActionPlan();
    this.GetActiveSessions();
    this.openModal();
  }

  openModal() {
    
    const modalRef = this.modalService.open(AccountComponent).componentInstance;
    
    /*
    this.modalService.open(AccountComponent).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    */

    modalRef.account = this.currentItem;
    modalRef.actionplansIds = this.actionplansIds;
    modalRef.actiontriggersIds = this.actiontriggersIds;
    modalRef.buildForm();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  saveItem() {
    this._cgratesService.SetAccount(this.currentItem)
      .then((response) => {
        this.reload();
        //this.details.close();
      })
      .catch(err => {
        this._logger.setLog(err);
      });

  }

  deleteItem() {
    this._cgratesService.RemoveAccount(this.currentItem.ID)
      .then((response) => {
        this.reload();
        //this.details.close();
      })
      .catch(err => {
        this._logger.setLog(err);
      });
  }

  removeBalances(_balanceType: string, _balanceUuid?: string) {
    let _balanceFilter = new AttrSetBalance();
    let _tmp = this.currentItem.ID.split(':');
    let _tenant = _tmp[0];
    let _account = _tmp[1];
    _balanceFilter.Tenant = _tenant;
    _balanceFilter.Account = _account;
    _balanceFilter.BalanceType = _balanceType;
    if (_balanceUuid) {_balanceFilter.BalanceUUID = _balanceUuid;}
    this._cgratesService.RemoveBalances(_balanceFilter)
      .then((response) => {
        this.reload();
        this.getAccount(_tenant, _account);
      })
      .catch(err => {
        this._logger.setLog(err);
      });
  }

  reloadCdrs(params) {
    console.log(JSON.stringify(params)); // {"sortBy":"AnswerTime","sortAsc":false,"offset":0,"limit":8}
    this.cdrResource.query(params).then(cdrs => this.cdrs = cdrs);
  }

  reloadActiveSessions(params) {
    console.log(JSON.stringify(params)); // {"sortBy":"AnswerTime","sortAsc":false,"offset":0,"limit":8}
    this.accountActiveSessions = new Array();
    this.accountActiveSessionsResource.query(params).then(accountActiveSessions => this.accountActiveSessions = accountActiveSessions);
  }

  rowColors(cdr) {

    let color = 'rgb(255, 255, 255)';

    switch (cdr.Category) {
      case 'voice':
        color = 'rgb(92, 184, 92)';
        break;
      case 'sms':
        color = 'rgb(240, 173, 78)';
        break;
      case 'data':
        color = 'rgb(91, 192, 222)';
        break;
      case 'monetary':
        color = 'rgb(25, 25, 192)';
        break;
      case 'activation':
        color = 'rgb(25, 25, 25)';
        break;
      case 'balance_update':
        color = 'rgb(192, 25, 25)';
        break;
    }

    return color;
  }

  cellColor(cdr) {
    if (cdr.Cost > 0) {
      return 'rgb(255, 0, 0)';
    }
    //console.log("cellColor fired: " + JSON.stringify(cdr));
    //return 'rgb(' + ( Math.floor( ( 255 / cdr.Cost) ) ) + ', 255 , 255)';
  };

  getBalanceStyle(_key: string) {
    return this.balanceStyle[_key];
  }


  getCdrs(_filter?: string) {
    let _cdrFilter = new AttrGetCdrs();
    let _tmp = this.currentItem.ID.split(':');
    let _tenant = _tmp[0];
    let _account = _tmp[1];
    _cdrFilter.MediationRunIds.push('*default');
    _cdrFilter.Tenants.push(_tenant);
    _cdrFilter.Accounts.push(_account);
    if (_filter) {
      _cdrFilter.TORs.push(_filter);
    }
    //_cdrFilter.Categories.push(_category);
    //_cdrFilter.Paginator = new Paginator(8, 0);
    //this.currentCategory = _category;
    //_cdrFilter.Subjects.push(this.currentItem.Subjects);

    //console.log(JSON.stringify(_cdrFilter));
    this._cgratesService.GetCdrs(_cdrFilter)
      .then((response) => {

        //console.log('getCdrs: ' + JSON.stringify(response));
        this.cdrs = response;

        this.cdrResource = new DataTableResource(this.cdrs);
        //this.cdrCount = this.cdrs.length;
        this.cdrResource.count().then(count => this.cdrCount = count);

      })
      .catch(err => {
        this._logger.error(err);
      });
  }



  // special properties:

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }


  rowTooltip(item) {return item.OrderID;}



  /*
  
    paramsToPaginator(params: DataTableParams) {
  
      let paginator: Paginator;
  
      if (params.offset != null) {
        paginator.Offset = params.offset;
      }
      if (params.limit != null) {
        paginator.Limit = params.limit;
      }
  
    return paginator;
    }
  */

}
