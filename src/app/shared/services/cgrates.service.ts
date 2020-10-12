import {
  AttrGetTPRateIds, AttrGetTPRate, TPRate, TPDestination, AttrGetTPDestinationIds,
  AttrGetTPDestination, AttrGetTPDestinationRate, AttrReloadCache, AttrGetTPTiming,
  AttrGetTPTimingIds, AttrGetTPIds, AttrGetTPRatingPlanIds, AttrGetTPRatingPlan,
  AttrGetTPRatingProfileIds, AttrGetTPRatingProfile, TPTiming, TPDestinationRate,
  TPRatingPlan, TPRatingProfile, AttrGetTPActionIds, AttrGetTPActions, TPActions,
  AttrGetTPActionPlanIds, AttrGetTPActionPlan, TPActionPlan, AttrImportTPFromFolder,
  AttrLoadTpFromFolder, AttrLoadTpFromStorDb, AttrGetAccounts, AttrGetAccount,
  AttrCacheStats, AttrGetTPUserIds, AttrGetTPUser, TPUsers, AttrGetTPAccountActions,
  AttrGetTPAccountActionIds, TPAccountActions, AttrGetTPActionTriggerIds, AttrGetTPActionTriggers,
  AttrGetTPAlias, AttrGetTPAliasIds, TPAliases, AttrGetTPCdrStatIds, AttrGetTPCdrStats,
  TPCdrStats, AttrGetTPDerivedChargeIds, AttrGetTPDerivedChargers, TPDerivedChargers,
  AttrGetTPLcrIds, AttrGetTPLcrRules, AttrGetTPResourceLimitIds, AttrGetTPResourceLimit,
  AttrGetTPSharedGroupIds, AttrGetTPSharedGroups, TPLcrRules, TPResourceLimit, TPSharedGroups,
  AttrSetAccount, AttrGetCdrs, Paginator, AttrGetActionTriggers, AttrRemoveAccount, AttrSetBalance,
  AttrAddBalance, SMGenericEvent, AttrDirExportTP, AttrAcntAction, ActiveSession
} from '../entities/cgrates/Types';
import {JsonrpcService} from './jsonrpc.service';
import {Injectable, EventEmitter} from '@angular/core';


@Injectable()
export class CGRatesService {

  // set defaults
  _tpid = 'GTP';
  _tenant = 'golant';
  _limit = 10;
  _offset = 0;

  public tpidEvent: EventEmitter<String> = new EventEmitter<String>();

  _action_identifiers: string[] = [
    '*log', '*reset_triggers', '*set_recurrent', '*unset_recurrent',
    '*allow_negative', '*deny_negative', '*reset_account',
    '*remove_account', '*set_balance', '*remove_balance', '*topup_reset',
    '*topup', '*debit_reset', '*debit', '*reset_counters', '*enable_account',
    '*disable_account', '*call_url', '*call_url_async', '*mail_async',
    '*unlimited', '*cdrlog', '*set_ddestinations', '*transfer_monetary_default',
    '*cgr_rpc'
  ]

  constructor(private _jsonrpc: JsonrpcService) {}


  getTPid() {
    return this._tpid;
  }

  setTPid(_tpid: string) {
    this._tpid = _tpid;
    this.tpidEvent.emit(this._tpid);
  }

  getTenant() {
    return this._tenant;
  }

  setTenant(_tenant: string) {
    this._tenant = _tenant;
  }

  getLimit() {
    return this._limit;
  }

  setLimit(limit: number) {
    this._limit = limit;
  }

  getOffset() {
    return this._offset;
  }

  setOffset(offset: number) {
    this._offset = offset;
  }

  // Configs
  ImportTariffPlanFromFolder(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.ImportTariffPlanFromFolder',
      new AttrImportTPFromFolder(this.getTPid(), '/home/golan/tariff_golan/', 'default', ','));

  }
  LoadTariffPlanFromFolder(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.LoadTariffPlanFromFolder',
      new AttrLoadTpFromFolder('/home/golan/TPExport/', false, true, true));

  }



  // TP
  GetTPIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPIds', new AttrGetTPIds());

  }

  ExportTPToFolder(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV2.ExportTPToFolder',
      // _tpid, _fileFormat, _fieldSeparator, _exportPath, _compress
      new AttrDirExportTP(this.getTPid(), '/home/golan/TPExport/')
    );

  }

  // Loads complete data in a TP from storDb
  LoadTariffPlanFromStorDb(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.LoadTariffPlanFromStorDb',
      // _tpid _flushDb _dryRun _validate
      new AttrLoadTpFromStorDb(this.getTPid(), true, false, true));

  }


  // CDRs
  // Retrieves CDRs based on the filters
  GetCdrs(_filter: AttrGetCdrs): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetCdrs', _filter);

  }

  // Cache

  GetCacheStats(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetCacheStats', new AttrCacheStats());

  }

  FlushCache(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.FlushCache', new AttrReloadCache());

  }

  ReloadCache(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.ReloadCache', new AttrReloadCache());

  }

  LoadCache(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.LoadCache', new AttrReloadCache());

  }



  // Scheduler
  ReloadScheduler(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.ReloadScheduler', '');

  }


  // Accounts
  GetAccounts(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV2.GetAccounts', new AttrGetAccounts(this.getTenant(), this.getLimit(), this.getOffset()));

  }

  GetAccount(_tenant: string, _account: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV2.GetAccount', new AttrGetAccount(_tenant, _account));

  }

  SetAccount(_item: AttrSetAccount): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV2.SetAccount', _item);
  }

  RemoveAccount(_id: string): Promise<any> {

    const _tmp = _id.split(':');
    const _tenant = _tmp[0];
    const _account = _tmp[1];

    return this._jsonrpc.sendJsonRpc('ApierV2.GetAccounts', new AttrRemoveAccount(_tenant, _account, true));

  }

  GetAccountActionPlan(_tenant: string, _account: string): Promise<any> {
    return this._jsonrpc.sendJsonRpc('ApierV1.GetAccountActionPlan', new AttrAcntAction(_tenant, _account));
  }


  GetActiveSessions(_tenant: string, _account: string): Promise<any> {
    return this._jsonrpc.sendJsonRpc('SMGenericV1.GetActiveSessions', new ActiveSession(_tenant, _account));
  }



  // Balances

  RemoveBalances(_balance: AttrSetBalance): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemoveBalances', _balance);

  }

  SetBalance(_item: AttrSetBalance): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetBalance', _item);
  }

  AddBalance(_item: AttrAddBalance): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.AddBalance', _item);
  }



  // ActionTriggers
  GetActionTriggers(_groupIds: string[]): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetActionTriggers', new AttrGetActionTriggers(_groupIds));

  }




  //  return this._jsonrpc.sendJsonRpc('ApierV1.RemoveAccount', new utils.AttrRemoveAccount, reply *string) (err error)
  //
  //
  //
  //    return this._jsonrpc.sendJsonRpc('ApierV1.GetAccountActionTriggers', new AttrAcntAction, reply *engine.ActionTriggers) error
  //
  //    return this._jsonrpc.sendJsonRpc('ApierV1.RemoveAccountActionTriggers', new AttrRemoveAccountActionTriggers, reply *string) error
  //    return this._jsonrpc.sendJsonRpc('ApierV1.RemoveActionTrigger', new AttrRemoveActionTrigger, reply *string) error
  //    return this._jsonrpc.sendJsonRpc('ApierV1.ServiceStatus', new servmanager.ArgStartService, reply *string) (err error)
  //
  //    return this._jsonrpc.sendJsonRpc('ApierV1.SetAccountActionTriggers', new AttrSetAccountActionTriggers, reply *string) error
  //

  //    return this._jsonrpc.sendJsonRpc('ApierV1.GetDestination(dstId string, reply *engine.Destination) error
  //    return this._jsonrpc.sendJsonRpc('ApierV1.RemoveDestination', new AttrRemoveDestination, reply *string) (err error)
  //    return this._jsonrpc.sendJsonRpc('ApierV1.SetDestination', new utils.AttrSetDestination, pl*sin (r ror)






  // Timing
  GetTPTimingIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPTimingIds', new AttrGetTPTimingIds(this.getTPid()));

  }

  GetTPTiming(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPTiming', new AttrGetTPTiming(this.getTPid(), _id));

  }

  SetTPTiming(_item: TPTiming): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPTiming', _item);

  }

  RemTPTiming(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPTiming', new AttrGetTPTiming(this.getTPid(), _id));

  }

  // Rates
  GetTPRateIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRateIds', new AttrGetTPRateIds(this.getTPid()));

  }

  GetTPRate(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRate', new AttrGetTPRate(this.getTPid(), _id));

  }

  SetTPRate(_item: TPRate): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPRate', _item);

  }

  RemTPRate(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPRate', new AttrGetTPRate(this.getTPid(), _id));

  }

  // Destinations

  GetTPDestinationIDs(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPDestinationIDs', new AttrGetTPDestinationIds(this.getTPid()));

  }

  GetTPDestination(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPDestination', new AttrGetTPDestination(this.getTPid(), _id));

  }

  SetTPDestination(_item: TPDestination): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPDestination', _item);
  }

  RemTPDestination(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPDestination', new AttrGetTPDestination(this.getTPid(), _id));

  }

  // Destination Rates

  GetTPDestinationRateIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPDestinationRateIds', new AttrGetTPRateIds(this.getTPid()));

  }

  GetTPDestinationRate(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPDestinationRate', new AttrGetTPDestinationRate(this.getTPid(), _id));

  }

  SetTPDestinationRate(_item: TPDestinationRate): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPDestinationRate', _item);
  }

  RemTPDestinationRate(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPDestinationRate', new AttrGetTPDestinationRate(this.getTPid(), _id));

  }

  // Rating Plan

  GetTPRatingPlanIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRatingPlanIds', new AttrGetTPRatingPlanIds(this.getTPid()));

  }

  GetTPRatingPlan(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRatingPlan', new AttrGetTPRatingPlan(this.getTPid(), _id));

  }

  SetTPRatingPlan(_item: TPRatingPlan): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPRatingPlan', _item);
  }

  RemTPRatingPlan(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPRatingPlan', new AttrGetTPRatingPlan(this.getTPid(), _id));

  }

  // Rating Profile
  //    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRatingProfileLoadIds', new utils.AttrTPRatingProfileIds, reply *[]string) error
  //    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRatingProfilesByLoadId', new utils.TPRatingProfile, reply *[]*utils.TPRatingProfile) error

  GetTPRatingProfileIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRatingProfileIds', new AttrGetTPRatingProfileIds(this.getTPid()));

  }

  GetTPRatingProfile(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPRatingProfile', new AttrGetTPRatingProfile(this.getTPid(), _id));

  }

  SetTPRatingProfile(_item: TPRatingProfile): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPRatingProfile', _item);
  }

  RemTPRatingProfile(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPRatingProfile', new AttrGetTPRatingProfile(this.getTPid(), _id));

  }

  // Actions

  GetActionIdentifiers(): string[] {
    return this._action_identifiers;
  }

  GetTPActionIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPActionIds', new AttrGetTPActionIds(this.getTPid()));

  }

  GetTPActions(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPActions', new AttrGetTPActions(this.getTPid(), _id));

  }

  SetTPActions(_item: TPActions): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPActions', _item);
  }

  RemTPActions(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPActions', new AttrGetTPActions(this.getTPid(), _id));

  }

  // ActionPlans


  GetTPActionPlanIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPActionPlanIds', new AttrGetTPActionPlanIds(this.getTPid()));

  }

  GetTPActionPlan(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPActionPlan', new AttrGetTPActionPlan(this.getTPid(), _id));

  }

  SetTPActionPlan(_item: TPActionPlan): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPActionPlan', _item);
  }

  RemTPActionPlan(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPActionPlan', new AttrGetTPActionPlan(this.getTPid(), _id));

  }


  // ActionTriggers

  GetTPActionTriggerIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPActionTriggerIds', new AttrGetTPActionTriggerIds(this.getTPid()));

  }

  GetTPActionTriggers(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPActionTriggers', new AttrGetTPActionTriggers(this.getTPid(), _id));

  }

  SetTPActionTriggers(_item: TPActionPlan): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPActionTriggers', _item);

  }

  RemTPActionTriggers(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPActionTriggers', new AttrGetTPActionTriggers(this.getTPid(), _id));

  }

  // AccountActions
  GetTPAccountActionIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPAccountActionIds', new AttrGetTPAccountActionIds(this.getTPid()));

  }

  GetTPAccountActions(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPAccountActions', new AttrGetTPAccountActions(this.getTPid(), _id));

  }

  SetTPAccountActions(_item: TPAccountActions): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPAccountActions', _item);
  }

  RemTPAccountActions(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPAccountActions', new AttrGetTPAccountActions(this.getTPid(), _id));

  }

  GetTPAccountActionLoadIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPAccountActionLoadIds', new AttrGetTPAccountActionIds(this.getTPid()));

  }

  GetTPAccountActionsByLoadId(_item: TPAccountActions): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPAccountActionsByLoadId', _item);

  }

  // Users
  GetTPUserIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPUserIds', new AttrGetTPUserIds(this.getTPid()));

  }

  GetTPUser(_tenant: string, _username: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPUser', new AttrGetTPUser(this.getTPid(), _tenant, _username));

  }

  SetTPUser(_item: TPUsers): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPUser', _item);
  }

  RemTPUser(_tenant: string, _username: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPUser', new AttrGetTPUser(this.getTPid(), _tenant, _username));

  }

  // Aliases
  GetTPAliasIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPAliasIds', new AttrGetTPAliasIds(this.getTPid()));

  }

  GetTPAlias(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPAlias', new AttrGetTPAlias(this.getTPid(), _id));

  }

  SetTPAlias(_item: TPAliases): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPAlias', _item);
  }

  RemTPAlias(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPAlias', new AttrGetTPAlias(this.getTPid(), _id));

  }

  // CdrStats
  GetTPCdrStatsIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPCdrStatsIds', new AttrGetTPCdrStatIds(this.getTPid()));

  }

  GetTPCdrStats(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPCdrStats', new AttrGetTPCdrStats(this.getTPid(), _id));

  }

  SetTPCdrStats(_item: TPCdrStats): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPCdrStats', _item);
  }

  RemTPCdrStats(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPCdrStats', new AttrGetTPCdrStats(this.getTPid(), _id));

  }

  // DerivedChargers
  GetTPDerivedChargerIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPDerivedChargerIds', new AttrGetTPDerivedChargeIds(this.getTPid()));

  }

  GetTPDerivedChargers(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPDerivedChargers', new AttrGetTPDerivedChargers(this.getTPid(), _id));

  }

  SetTPDerivedChargers(_item: TPDerivedChargers): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPDerivedChargers', _item);
  }

  RemTPDerivedChargers(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPDerivedChargers', new AttrGetTPDerivedChargers(this.getTPid(), _id));

  }

  // LcrRule
  GetTPLcrRuleIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPLcrRuleIds', new AttrGetTPLcrIds(this.getTPid()));

  }

  GetTPLcrRule(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPLcrRule', new AttrGetTPLcrRules(this.getTPid(), _id));

  }

  SetTPLcrRule(_item: TPLcrRules): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPLcrRule', _item);
  }

  RemTPLcrRule(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPLcrRule', new AttrGetTPLcrRules(this.getTPid(), _id));

  }

  // ResourceLimit
  GetTPResourceLimitIDs(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPResourceLimitIDs', new AttrGetTPResourceLimitIds(this.getTPid()));

  }

  GetTPResourceLimit(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPResourceLimit', new AttrGetTPResourceLimit(this.getTPid(), _id));

  }

  SetTPResourceLimit(_item: TPResourceLimit): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPResourceLimit', _item);
  }

  RemTPResourceLimit(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPResourceLimit', new AttrGetTPResourceLimit(this.getTPid(), _id));

  }

  // SharedGroups
  GetTPSharedGroupIds(): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPSharedGroupIds', new AttrGetTPSharedGroupIds(this.getTPid()));

  }

  GetTPSharedGroups(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.GetTPSharedGroups', new AttrGetTPSharedGroups(this.getTPid(), _id));

  }

  SetTPSharedGroups(_item: TPSharedGroups): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.SetTPSharedGroups', _item);
  }

  RemTPSharedGroups(_id: string): Promise<any> {

    return this._jsonrpc.sendJsonRpc('ApierV1.RemTPSharedGroups', new AttrGetTPSharedGroups(this.getTPid(), _id));

  }


  // SMG

  ChargeEvent(_item: SMGenericEvent): Promise<any> {

    return this._jsonrpc.sendJsonRpc('SMGenericV1.ChargeEvent', _item);

  }

  GetMaxUsage(_item: SMGenericEvent): Promise<any> {

    return this._jsonrpc.sendJsonRpc('SMGenericV1.GetMaxUsage', _item);

  }

  InitiateSession(_item: SMGenericEvent): Promise<any> {

    return this._jsonrpc.sendJsonRpc('SMGenericV2.InitiateSession', _item);

  }

  UpdateSession(_item: SMGenericEvent): Promise<any> {

    return this._jsonrpc.sendJsonRpc('SMGenericV2.UpdateSession', _item);

  }

  TerminateSession(_item: SMGenericEvent): Promise<any> {

    return this._jsonrpc.sendJsonRpc('SMGenericV1.TerminateSession', _item);

  }

  ProcessCDR(_item: SMGenericEvent): Promise<any> {

    return this._jsonrpc.sendJsonRpc('SMGenericV1.ProcessCDR', _item);

  }



  /*
    return this._jsonrpc.sendJsonRpc('ApierV1.AddAccountActionTriggers', new AttrAddAccountActionTriggers, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.AddAccountAliases', new AttrAddAccountAliases, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.AddRatingSubjectAliases', new AttrAddRatingSubjectAliases, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.AddTriggeredAction', new AttrAddActionTrigger, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.ComputeAccountActionPlans(ignr string, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.ComputeReverseAliases(ignr string, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.ComputeReverseDestinations(ignr string, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.DebitBalance', new *AttrAddBalance, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.DebitUsage(usageRecord engine.UsageRecord, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.DebitUsageWithOptions', new AttrDebitUsageWithOptions, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.ExecuteAction', new *utils.AttrExecuteAction, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.ExecuteScheduledActions', new AttrsExecuteScheduledActions, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.ExportCDRs(arg ArgExportCDRs, reply *RplExportedCDRs) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.ExportCdrsToFile', new utils.AttrExpFileCdrs, reply *utils.ExportedFileCdrs) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.ExportCdrsToZipString', new utils.AttrExpFileCdrs, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.GetActionPlan', new AttrGetActionPlan, reply *[]*engine.ActionPlan) error

    return this._jsonrpc.sendJsonRpc('ApierV1.GetActions(actsId string, reply *[]*utils.TPAction) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetCacheKeys', new utils.ArgsCacheKeys, reply *utils.ArgsCache) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.GetCacheStats', new utils.AttrCacheStats, reply *utils.CacheStats) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetCallCostLog', new utils.AttrGetCallCost, reply *engine.SMCost) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetCdrs', new utils.AttrGetCdrs, reply *[]*engine.ExternalCDR) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetDataCost', new AttrGetDataCost, reply *engine.DataCost) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetDerivedChargers', new utils.AttrDerivedChargers, reply *utils.DerivedChargers) (err error)

    return this._jsonrpc.sendJsonRpc('ApierV1.GetLcr(lcrReq engine.LcrRequest, lcrReply *engine.LcrReply) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetLcrSuppliers(lcrReq engine.LcrRequest, suppliers *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.GetLoadHistory', new utils.Paginator, reply *[]*utils.LoadInstance) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetMaxUsage(usageRecord engine.UsageRecord, maxUsage *float64) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetRatingPlan(rplnId string, reply *engine.RatingPlan) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetReverseDestination(prefix string, reply *[]string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.GetScheduledActions', new scheduler.ArgsGetScheduledActions, reply *[]*scheduler.ScheduledAction) error
    return this._jsonrpc.sendJsonRpc('ApierV1.GetSharedGroup(sgId string, reply *engine.SharedGroup) error
   *

    return this._jsonrpc.sendJsonRpc('ApierV1.ImportTPZipFile', new AttrImportTPZipFile, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.LoadAccountActions', new utils.TPAccountActions, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.LoadCdrStats', new AttrLoadCdrStats, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.LoadDerivedChargers', new utils.TPDerivedChargers, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.LoadDestination', new AttrLoadDestination, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.LoadRatingPlan', new AttrLoadRatingPlan, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.LoadRatingProfile', new utils.TPRatingProfile, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.LoadSharedGroup', new AttrLoadSharedGroup, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.RateCDRs', new utils.AttrRateCDRs, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.ReloadCdrcConfig', new AttrReloadConfig, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.ReloadCdreConfig', new AttrReloadConfig, reply *string) error

   *
    return this._jsonrpc.sendJsonRpc('ApierV1.RemAccountAliases(tenantAccount engine.TenantAccount, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.RemActionTiming', new AttrRemActionTiming, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.RemCdrs', new utils.AttrRemCdrs, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.RemDerivedChargers', new AttrRemDerivedChargers, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.RemRatingSubjectAliases(tenantRatingSubject engine.TenantRatingSubject, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.RemoteLock', new AttrRemoteLock, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.RemoteUnlock(lockIDs []string, reply *string) error

   *  return this._jsonrpc.sendJsonRpc('ApierV1.RemoveActions', new AttrRemoveActions, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.RemoveCDRs', new utils.RPCCDRsFilter, reply *string) error

    return this._jsonrpc.sendJsonRpc('ApierV1.RemoveRatingProfile', new AttrRemoveRatingProfile, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.ReplayFailedPosts', new ArgsReplyFailedPosts, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.ResetAccountActionTriggers', new AttrResetAccountActionTriggers, reply *string) error
    return this._jsonrpc.sendJsonRpc('ApierV1.SetActionPlan', new AttrSetActionPlan, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.SetActionTrigger', new AttrSetActionTrigger, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.SetActions', new V1AttrSetActions, reply *string) (err error)

    return this._jsonrpc.sendJsonRpc('ApierV1.SetDerivedChargers', new AttrSetDerivedChargers, reply *string) (err error)

    return this._jsonrpc.sendJsonRpc('ApierV1.SetRatingProfile', new AttrSetRatingProfile, reply *string) (err error)



    return this._jsonrpc.sendJsonRpc('ApierV1.StartService', new servmanager.ArgStartService, reply *string) (err error)
    return this._jsonrpc.sendJsonRpc('ApierV1.StopService', new servmanager.ArgStartService, reply *string) (err error)
*/
}
