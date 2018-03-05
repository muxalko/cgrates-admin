
export class AttrCacheStats {
}

export class CacheKeys {
  DestinationIDs = null;
  ReverseDestinationIDs = 0;
  RatingPlanIDs = 0;
  RatingProfileIDs = 0;
  ActionIDs = 0;
  ActionPlanIDs = 0;
  AccountActionPlanIDs = 0;
  ActionTriggerIDs = 0;
  SharedGroupIDs = 0;
  LCRids = 0;
  DerivedChargerIDs = 0;
  AliasIDs = 0;
  everseAliasIDs = 0;
  ResourceProfileIDs = 0;
  ResourceIDs = 0;
  StatsQueueIDs = 0;
  StatsQueueProfileIDs = 0;
  ThresholdIDs = 0;
  ThresholdProfileIDs = 0;
  FilterIDs = 0;
  SupplierProfileIDs = 0;
  AttributeProfileIDs = 0;
}

export class CacheStats {
  Destinations = 0;
  ReverseDestinations = 0;
  RatingPlans = 0;
  RatingProfiles = 0;
  Actions = 0;
  ActionPlans = 0;
  AccountActionPlans = 0;
  SharedGroups = 0;
  DerivedChargers = 0;
  LcrProfiles = 0;
  CdrStats = 0;
  Users = 0;
  Aliases = 0;
  ReverseAliases = 0;
  ResourceProfiles = 0;
  Resources = 0;
  StatQueues = 0;
  StatQueueProfiles = 0;
  Thresholds = 8;
  ThresholdProfiles = 0;
  Filters = 0;
  SupplierProfiles = 0;
  AttributeProfiles = 0;
}

export class AttrReloadCache {
  ArgsCache: any[];
  FlushAll = true; // If provided, cache flush will be executed before any action
}

export class AttrImportTPFromFolder {
  TPid: string;
  FolderPath: string;
  RunId: string;
  CsvSeparator: string;
  constructor(_tpid: string, _folderPath: string, _runId: string, _csvSeparator: string) {
    this.TPid = _tpid;
    this.FolderPath = _folderPath;
    this.RunId = _runId;
    this.CsvSeparator = _csvSeparator;
  }
}

export class AttrDirExportTP {
  TPid: string;
  FileFormat: string; // Format of the exported file <csv>
  FieldSeparator: string; // Separator used between fields
  ExportPath: string; // If provided it overwrites the configured export path
  Compress: boolean;   // If true the folder will be compressed after export performed
  constructor(_tpid: string, _exportPath: string) {
    this.TPid = _tpid;
    this.ExportPath = _exportPath;
  }
}

export class AttrLoadTpFromFolder {
  FolderPath: string; // Take files from folder absolute path
  DryRun: boolean;   // Do not write to database but parse only
  FlushDb: boolean;   // Flush previous data before loading new one
  Validate: boolean;   // Run structural checks on data
  constructor(_folderPath: string, _dryRun: boolean, _flushDb: boolean, _validate: boolean) {
    this.FolderPath = _folderPath;
    this.DryRun = _dryRun;
    this.FlushDb = _flushDb;
    this.Validate = _validate;
  }
}

export class AttrLoadTpFromStorDb {
  TPid: string;
  FlushDb: boolean;  // Flush dataDB before loading
  DryRun: boolean; // Only simulate, no write
  Validate: boolean; // Run structural checks
  constructor(_tpid: string, _flushDb: boolean, _dryRun: boolean, _validate: boolean) {
    this.TPid = _tpid;
    this.FlushDb = _flushDb;
    this.DryRun = _dryRun;
    this.Validate = _validate;
  }
}

export class RITiming {
  Years: string; // utils.Years
  Months: string; // utils.Months
  MonthDays: string; // utils.MonthDays
  WeekDays: string; // utils.WeekDays
  StartTime: string;
  EndTime: string; // ##:##:## format
  // contains filtered or unexported fields
}

// for computing a dynamic value for Value field
export class ValueFormula {
  Method: string;
  Params: Map<string, any>; // map[string]interface{}
  Static: number;
}

export class BalanceFilter {
  Uuid: string;
  ID: string;
  Type: string;
  Value: ValueFormula;
  Directions: Map<string, boolean>;
  ExpirationDate: string; // *time.Time
  Weight: number;
  DestinationIDs: Map<string, boolean>;
  RatingSubject: string;
  Categories: Map<string, boolean>;
  SharedGroups: Map<string, boolean>;
  TimingIDs: Map<string, boolean>;
  Timings: RITiming[] = new Array;
  Disabled: boolean;
  Factor: Map<string, number>; // ValueFactor;
  Blocker: boolean;
}

// Can hold different units as seconds or monetary
export class Balance {
  Uuid: string; // system wide unique
  ID: string; // account wide unique
  Value: number;
  Directions: Map<string, boolean>;
  ExpirationDate: string; // time.Time
  Weight: number;
  DestinationIDs: Map<string, boolean>;
  RatingSubject: string;
  Categories: Map<string, boolean>;
  SharedGroups: Map<string, boolean>;
  Timings: RITiming[] = new Array;
  TimingIDs: Map<string, boolean>;
  Disabled: boolean;
  Factor: Map<string, number>; // ValueFactor;
  Blocker: boolean;
  // contains filtered or unexported fields
}

export class AttrSetBalance {
  Tenant: string;
  Account: string;
  BalanceType: string;
  BalanceUUID: string;
  BalanceID: string;
  Directions: string;
  Value: number;
  ExpiryTime: string;
  RatingSubject: string;
  Categories: string;
  DestinationIds: string;
  TimingIds: string;
  Weight: number;
  SharedGroups: string;
  Blocker: boolean;
  Disabled: boolean;

  //  constructor(_tenant: string, _account: string, _balanceType: string, _balanceUuid: string) {
  //    this.Tenant = _tenant; this.Account = _account; this.BalanceType = _balanceType;
  //  }
}

export class AttrAddBalance {
  Tenant: string;
  Account: string;
  BalanceUuid: string;
  BalanceId: string;
  BalanceType: string;
  Directions: string;
  Value: number;
  ExpiryTime: string;
  RatingSubject: string;
  Categories: string;
  DestinationIds: string;
  TimingIds: string;
  Weight: number;
  SharedGroups: string;
  Overwrite: boolean; // When true it will reset if the balance is already there
  Blocker: boolean;
  Disabled: boolean;
}

export class UnitCounter {
  CounterType: string;        // *event or *balance
  Counters: CounterFilter[]; // first balance is the general one (no destination)
}

export class CounterFilter {
  Value: number;
  Filter: BalanceFilter;
}

export class ActionTrigger {
  ID: string; // original csv tag
  UniqueID: string; // individual id
  ThresholdType: string; // *min_event_counter, *max_event_counter, *min_balance_counter, *max_balance_counter, *min_balance, *max_balance, *balance_expired
  // stats: *min_asr, *max_asr, *min_acd, *max_acd, *min_tcd, *max_tcd, *min_acc, *max_acc, *min_tcc, *max_tcc, *min_ddc, *max_ddc
  ThresholdValue: number;
  Recurrent: boolean; // reset excuted flag each run
  MinSleep: number; // time.Duration // Minimum duration between two executions in case of recurrent triggers
  ExpirationDate: string; // time.Time
  ActivationDate: string; // time.Time
  // BalanceType       string // *monetary/*voice etc
  Balance: BalanceFilter;
  Weight: number;
  ActionsID: string;
  MinQueuedItems: number; // Trigger actions only if this number is hit (stats only)
  Executed: boolean;
  LastExecutionTime: string; // time.Time
}

// Structure containing information about user's credit (minutes, cents, sms...).'
// This can represent a user or a shared group.
export class Account {
  ID: string;
  BalanceMap: Map<string, Balance[]>;
  UnitCounters: UnitCounter[] = new Array;
  ActionTriggers: ActionTrigger[] = new Array;
  AllowNegative: boolean;
  Disabled: boolean;
  // contains filtered or unexported fields
}

export class AttrGetAccount {
  Tenant: string;
  Account: string;
  constructor(_tenant: string, _account: string) {this.Tenant = _tenant; this.Account = _account;}
}

export class AttrRemoveAccount {
  Tenant: string;
  Account: string;
  ReloadScheduler: boolean;
  constructor(_tenant: string, _account: string, _reloadScheduler: boolean) {this.Tenant = _tenant; this.Account = _account; this.ReloadScheduler = _reloadScheduler}
}

export class AttrGetAccounts {
  Tenant: string;
  AccountIds: string[];
  Offset: number; // Set the item offset
  Limit: number; // Limit number of items retrieved
  constructor(_tenant: string, _limit: number, _offset: number) {this.Tenant = _tenant; this.Limit = _limit; this.Offset = _offset;}
}

export class AttrSetAccount {
  Tenant: string;
  Account: string;
  ActionPlanIDs: string[];
  ActionPlansOverwrite: boolean;
  ActionTriggerIDs: string[];
  ActionTriggerOverwrite: boolean;
  AllowNegative: boolean;
  Disabled: boolean;
  ReloadScheduler: boolean;
}

export class AttrAcntAction {
  Tenant: string;
  Account: string;
  constructor(_tenant: string, _account: string) {this.Tenant = _tenant; this.Account = _account;}
}

export class AttrGetTPIds {
}


// Timing
export class ApierTPTiming {
  TPid: string; // Tariff plan id
  ID: string; // Timing id
  Years: string; // semicolon separated list of years this timing is valid on, *any supported
  Months: string; // semicolon separated list of months this timing is valid on, *any supported
  MonthDays: string; // semicolon separated list of month's days this timing is valid on, *any supported
  WeekDays: string; // semicolon separated list of week day names this timing is valid on *any supported
  Time: string; // String representing the time this timing starts on
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPTiming {
  ID: string;
  Years: string; // Year
  Months: string; // Months
  MonthDays: string; // MonthDays
  WeekDays: string; // WeekDays
  StartTime: string;
  EndTime: string;
}

export class AttrGetTPTiming {
  TPid: string; // Tariff plan id
  ID: string; // Timing id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class AttrGetTPTimingIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}


export class AttrGetTPRate {
  TPid: string; // Tariff plan id
  ID: string; // Rate id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}
export class AttrGetTPRateIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}
export class TPRate {
  TPid: string;      // Tariff plan id
  ID: string;      // Rate id
  RateSlots: RateSlot[] = new Array(); // One or more RateSlots
  constructor(_tpid: string) {this.TPid = _tpid;}
}
export class RateSlot {
  ConnectFee: number; // ConnectFee applied once the call is answered
  Rate: number; // Rate applied
  RateUnit: string; // Number of billing units this rate applies to
  RateIncrement: string; // This rate will apply in increments of duration
  GroupIntervalStart: string; // Group position
  rateUnitDur: number; // time.Duration;
  rateIncrementDur: number; // time.Duration;
  groupIntervalStartDur: number; // time.Duration;
}

export class DestinationRate {
  DestinationId: string; // The destination identity
  RateId: string; // The rate identity
  Rate: TPRate;
  RoundingMethod: string;
  RoundingDecimals: number;
  MaxCost: number;
  MaxCostStrategy: string;
}

export class AttrGetTPDestination {
  TPid: string; // Tariff plan id
  ID: string; // Destination id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class AttrGetTPDestinationIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPDestination {
  TPid: string;   // Tariff plan id
  ID: string;   // Destination id
  Prefixes: string[] = new Array(); // Prefixes attached to this destination
  constructor(_tpid: string) {this.TPid = _tpid;}
}


export class AttrTPDestinationRateIds {
  TPid: string;  // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPDestinationRate {
  TPid: string; // Tariff plan id
  ID: string; // Rate id
  Paginator: Paginator;
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class TPDestinationRate {
  TPid: string;             // Tariff plan id
  ID: string;             // DestinationRate profile id
  DestinationRates: DestinationRate[] = new Array();  // Set of destinationid-rateid bindings
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPRatingPlan {
  TPid: string;                 // Tariff plan id
  ID: string;                 // RatingPlan profile id
  RatingPlanBindings: TPRatingPlanBinding[] = new Array(); // Set of destinationid-rateid bindings
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPRatingPlanBinding {
  DestinationRatesId: string;  // The DestinationRate identity
  TimingId: string;  // The timing identity
  Weight: number; // Binding priority taken into consideration when more DestinationRates are active on a time slot
  // contains filtered or unexported fields
}

export class AttrGetTPRatingPlan {
  TPid: string; // Tariff plan id
  ID: string; // Rate id
  Paginator: Paginator;
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class AttrGetTPRatingPlanIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPRatingProfile {
  TPid: string;                // Tariff plan id
  LoadId: string;                // Gives ability to load specific RatingProfile based on load identifier, hence being able to keep history also in stordb
  Direction: string;                // Traffic direction, OUT is the only one supported for now
  Tenant: string;                // Tenant's Id
  Category: string;                // TypeOfRecord
  Subject: string;                // Rating subject, usually the same as account
  RatingPlanActivations: TPRatingActivation[] = new Array(); // Activate rate profiles at specific time
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPRatingActivation {
  ActivationTime: string; // Time when this profile will become active, defined as unix epoch time
  RatingPlanId: string; // Id of RatingPlan profile
  FallbackSubjects: string; // So we follow the api
  CdrStatQueueIds: string;
}

export class AttrGetTPRatingProfile {
  TPid: string; // Tariff plan id
  RatingProfileId: string; // RatingProfile id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.RatingProfileId = _id;}
}

export class AttrGetTPRatingProfileByLoadId {
  TPid: string; // Tariff plan id
  LoadId: string; // RatingProfile id
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPRatingProfileIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrSetRatingProfile {
  Tenant: string;                      // Tenant's Id
  Category: string;                      // TypeOfRecord
  Direction: string;                      // Traffic direction, OUT is the only one supported for now
  Subject: string;                      // Rating subject, usually the same as account
  Overwrite: boolean;                        // Overwrite if exists
  RatingPlanActivations: TPRatingActivation[] = new Array(); // Activate rating plans at specific time
}

export class ExportedFileCdrs {
  ExportedFilePath: string;            // Full path to the newly generated export file
  TotalRecords: number;               // Number of CDRs to be exported
  TotalCost: number;           // Sum of all costs in exported CDRs
  FirstOrderId: number;
  LastOrderId: number;             // The order id of the last exported CDR
  ExportedCgrIds: string[];          // List of successfuly exported cgrids in the file
  UnexportedCgrIds: Map<string, string>; // Map of errored CDRs, map key is cgrid, value will be the error string
}

export class AttrExpFileCdrs {
  CdrFormat: string;  // Cdr output file format <CdreCdrFormats>
  FieldSeparator: string;  // Separator used between fields
  ExportId: string;  // Optional exportid
  ExportDir: string;  // If provided it overwrites the configured export directory
  ExportFileName: string;  // If provided the output filename will be set to this
  ExportTemplate: string;  // Exported fields template  <""|fld1,fld2|*xml:instance_name>
  DataUsageMultiplyFactor: number;  // Multiply data usage before export (eg: convert from KBytes to Bytes)
  SmsUsageMultiplyFactor: number;  // Multiply sms usage before export (eg: convert from SMS unit to call duration for some billing systems)
  MmsUsageMultiplyFactor: number;  // Multiply mms usage before export (eg: convert from MMS unit to call duration for some billing systems)
  GenericUsageMultiplyFactor: number;  // Multiply generic usage before export (eg: convert from GENERIC unit to call duration for some billing systems)
  CostMultiplyFactor: number;  // Multiply the cost before export, eg: apply VAT
  CgrIds: string[]; // If provided, it will filter based on the cgrids present in list
  MediationRunIds: string[]; // If provided, it will filter on mediation runid
  TORs: string[]; // If provided, filter on TypeOfRecord
  CdrHosts: string[]; // If provided, it will filter cdrhost
  CdrSources: string[]; // If provided, it will filter cdrsource
  ReqTypes: string[]; // If provided, it will fiter reqtype
  Directions: string[]; // If provided, it will fiter direction
  Tenants: string[]; // If provided, it will filter tenant
  Categories: string[]; // If provided, it will filter çategory
  Accounts: string[]; // If provided, it will filter account
  Subjects: string[]; // If provided, it will filter the rating subject
  DestinationPrefixes: string[]; // If provided, it will filter on destination prefix
  OrderIdStart: number;   // Export from this order identifier
  OrderIdEnd: number;  // Export smaller than this order identifier
  TimeStart: string;   // If provided, it will represent the starting of the CDRs interval (>=)
  TimeEnd: string;   // If provided, it will represent the end of the CDRs interval (<)
  SkipErrors: boolean;     // Do not export errored CDRs
  SkipRated: boolean;     // Do not export rated CDRs
  SuppressCgrIds: boolean;     // Disable CgrIds reporting in reply/ExportedCgrIds and reply/UnexportedCgrIds
  Paginator: Paginator;
}

export class TPAction {
  Identifier: string; // Identifier mapped in the code
  BalanceId: string; // Balance identification string (account scope)
  BalanceUuid: string; // Balance identification string (global scope)
  BalanceType: string; // Type of balance the action will operate on
  Directions: string; // Balance direction
  Units: string; // Number of units to add/deduct
  ExpiryTime: string; // Time when the units will expire
  Filter: string; // The condition on balances that is checked before the action
  TimingTags: string; // Timing when balance is active
  DestinationIds: string; // Destination profile id
  RatingSubject: string; // Reference a rate subject defined in RatingProfiles
  Categories: string; // category filter for balances
  SharedGroups: string; // Reference to a shared group
  BalanceWeight: string; // Balance weight
  ExtraParameters: string;
  BalanceBlocker: string;
  BalanceDisabled: string;
  Weight; number; // Action's weight
}

export class TPActions {
  TPid: string;      // Tariff plan id
  ID: string;      // Actions id
  Actions: TPAction[] = new Array(); // Set of actions this Actions profile will perform
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPActionIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPActionPlan {
  TPid: string;            // Tariff plan id
  ID: string;            // ActionPlan id
  ActionPlan: TPActionTiming[] = new Array();  // Set of ActionTiming bindings this profile will group
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPActionTiming {
  ActionsId: string;  // Actions id
  TimingId: string;  // Timing profile id
  Weight: number; // Binding's weight
}

export class AttrGetTPActionPlan {
  TPid: string; // Tariff plan id
  ID: string; // ActionPlans id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}
export class AttrGetTPActionPlanIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}
export class AttrGetTPActionTriggerIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPActionTriggers {
  TPid: string; // Tariff plan id
  ID: string; // ActionTrigger id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class TPAccountActions {
  TPid: string; // Tariff plan id
  LoadId: string; // LoadId, used to group actions on a load
  Tenant: string; // Tenant's Id
  Account: string; // Account name
  ActionPlanId: string; // Id of ActionPlan profile to use
  ActionTriggersId: string; // Id of ActionTriggers profile to use
  AllowNegative: boolean;
  Disabled: boolean;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPActions {
  TPid: string; // Tariff plan id
  ID: string; // Actions id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class AttrGetTPAccountActionIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}
export class AttrGetTPAccountActions {
  TPid: string; // Tariff plan id
  AccountActionsId: string; // DerivedCharge id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.AccountActionsId = _id;}
}
export class AttrGetTPAccountActionsByLoadId {
  TPid: string; // Tariff plan id
  LoadId: string; // AccountActions id
}

export class TPAliases {
  TPid: string;
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
  Context: string;
  Values: TPAliasValue[] = new Array();
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPAliasValue {
  DestinationId: string;
  Target: string;
  Original: string;
  Alias: string;
  Weight: number;
}

export class AttrGetTPAlias {
  TPid: string; // Tariff plan id
  AliasId: string;
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.AliasId = _id;}

}
export class AttrGetTPAliasIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPCdrStat {
  QueueLength: string;
  TimeWindow: string;
  SaveInterval: string;
  Metrics: string;
  SetupInterval: string;
  TORs: string;
  CdrHosts: string;
  CdrSources: string;
  ReqTypes: string;
  Directions: string;
  Tenants: string;
  Categories: string;
  Accounts: string;
  Subjects: string;
  DestinationIds: string;
  PddInterval: string;
  UsageInterval: string;
  Suppliers: string;
  DisconnectCauses: string;
  MediationRunIds: string;
  RatedAccounts: string;
  RatedSubjects: string;
  CostInterval: string;
  ActionTriggers: string;
}

export class TPCdrStats {
  TPid: string;
  ID: string;
  CdrStats: TPCdrStat[];
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPCdrStatIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPCdrStats {
  TPid: string; // Tariff plan id
  ID: string; // CdrStat id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class TPDerivedCharger {
  RunId: string;
  RunFilters: string;
  ReqTypeField: string;
  DirectionField: string;
  TenantField: string;
  CategoryField: string;
  AccountField: string;
  SubjectField: string;
  DestinationField: string;
  SetupTimeField: string;
  PddField: string;
  AnswerTimeField: string;
  UsageField: string;
  SupplierField: string;
  DisconnectCauseField: string;
  CostField: string;
  RatedField: string;
}

export class TPDerivedChargers {
  TPid: string;
  LoadId: string;
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
  DestinationIds: string;
  DerivedChargers: TPDerivedCharger[] = new Array();
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPDerivedChargeIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class AttrGetTPDerivedChargers {
  TPid: string; // Tariff plan id
  DerivedChargersId: string; // DerivedCharge id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.DerivedChargersId = _id;}
}

export class TPLcrRules {
  TPid: string;
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
  Rules: TPLcrRule[] = new Array();
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPLcrRule {
  DestinationId: string;
  RpCategory: string;
  Strategy: string;
  StrategyParams: string;
  ActivationTime: string;
  Weight: number;
}

export class AttrGetTPLcrIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}
export class AttrGetTPLcrRules {
  TPid: string; // Tariff plan id
  LcrRuleId: string; // Lcr id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.LcrRuleId = _id;}
}

export class TPActivationInterval {
  ActivationTime: string;
  ExpiryTime: string;
}

export class TPRequestFilter {
  Type: string;   // Filter type (*string, *timing, *rsr_filters, *cdr_stats)
  FieldName: string;   // Name of the field providing us the Values to check (used in case of some )
  Values: string[]; // Filter definition
}

export class TPResourceLimit {
  TPid: string;
  ID: string;                // Identifier of this limit
  Filters: TPRequestFilter[];    // Filters for the request
  ActivationInterval: TPActivationInterval; // Time when this limit becomes active/expires
  UsageTTL: string;
  Limit: string; // Limit value
  AllocationMessage: string;
  Blocker: boolean; // blocker flag to stop processing on filters matched
  Stored: boolean;
  Weight: number;  // Weight to sort the ResourceLimits
  Thresholds: string[]; // Thresholds to check after changing Limit
}

export class AttrGetTPResourceLimit {
  TPid: string; // Tariff plan id
  ID: string;
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}
export class AttrGetTPResourceLimitIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}

export class TPSharedGroup {
  Account: string;
  Strategy: string;
  RatingSubject: string;
}

export class TPSharedGroups {
  TPid: string;
  ID: string;
  SharedGroups: TPSharedGroup[];
}

export class AttrGetTPSharedGroupIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}
export class AttrGetTPSharedGroups {
  TPid: string; // Tariff plan id
  ID: string; // SharedGroup id
  constructor(_tpid: string, _id: string) {this.TPid = _tpid; this.ID = _id;}
}

export class TPUsers {
  TPid: string;
  Tenant: string;
  UserName: string;
  Masked: boolean;
  Weight: number;
  Profile: TPUserProfile[] = new Array();
  constructor(_tpid: string) {this.TPid = _tpid;}
  // constructor(_tpid: string, _tenant: string, _username: string) {this.TPid = _tpid; this.Tenant = _tenant; this.UserName = _username;}
}

export class TPUserProfile {
  AttrName: string;
  AttrValue: string;
}

export class AttrGetTPUser {
  TPid: string; // Tariff plan id
  Tenant: string;
  UserName: string
  constructor(_tpid: string, _tenant: string, _username: string) {this.TPid = _tpid; this.Tenant = _tenant; this.UserName = _username;}
}

export class AttrGetTPUserIds {
  TPid: string; // Tariff plan id
  Paginator: Paginator;
  constructor(_tpid: string) {this.TPid = _tpid;}
}
export class AttrImportTPZipFile {
  TPid: string;
  File: any; // []byte;
}

// ArgExportCDRs are the arguments passed to ExportCDRs method
export class ArgExportCDRs {
  ExportTemplate: string; // Exported fields template  <""|fld1,fld2|>
  ExportFormat: string;
  ExportPath: string;
  Synchronous: boolean;
  Attempts: number;
  FieldSeparator: string;
  UsageMultiplyFactor: Map<string, number>;
  CostMultiplyFactor: number;
  ExportID: string; // Optional exportid
  ExportFileName: string; // If provided the output filename will be set to this
  RoundingDecimals: number;    // force rounding to this value
  Verbose: boolean;    // Disable CgrIds reporting in reply/ExportedCgrIds and reply/UnexportedCgrIds
  RPCCDRsFilter: RPCCDRsFilter;      // Inherit the CDR filter attributes
}


// There are always at least 2 CDRs created, even if you don't want
// derived charging. One will be for *raw data received (CDR without any
// modification) and second (*default) will be for default billing run
// (which also can modify data using *users or *aliases, hence the need to
// have it separately.
export class AttrGetCdrs {
  CgrIds: string[] = new Array(); // If provided, it will filter based on the cgrids present in list
  MediationRunIds: string[] = new Array(); // If provided, it will filter on mediation runid
  TORs: string[] = new Array(); // If provided, filter on TypeOfRecord
  CdrHosts: string[] = new Array(); // If provided, it will filter cdrhost
  CdrSources: string[] = new Array(); // If provided, it will filter cdrsource
  ReqTypes: string[] = new Array(); // If provided, it will fiter reqtype
  Directions: string[] = new Array(); // If provided, it will fiter direction
  Tenants: string[] = new Array(); // If provided, it will filter tenant
  Categories: string[] = new Array(); // If provided, it will filter çategory
  Accounts: string[] = new Array(); // If provided, it will filter account
  Subjects: string[] = new Array(); // If provided, it will filter the rating subject
  DestinationPrefixes: string[] = new Array(); // If provided, it will filter on destination prefix
  RatedAccounts: string[] = new Array(); // If provided, it will filter ratedaccount
  RatedSubjects: string[] = new Array(); // If provided, it will filter the ratedsubject
  OrderIdStart: number;   // Export from this order identifier
  OrderIdEnd: number;   // Export smaller than this order identifier
  TimeStart: string;   // If provided, it will represent the starting of the CDRs interval (>=)
  TimeEnd: string;   // If provided, it will represent the end of the CDRs interval (<)
  SkipErrors: boolean;     // Do not export errored CDRs
  SkipRated: boolean;     // Do not export rated CDRs
  Paginator: Paginator;
}

export class ExternalCDR {
  CGRID: string;
  RunID: string;
  OrderID: number;
  OriginHost: string;
  Source: string;
  OriginID: string;
  ToR: string;
  RequestType: string;
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
  Destination: string;
  SetupTime: string;
  PDD: string;
  AnswerTime: string;
  Usage: string;
  Supplier: string;
  DisconnectCause: string;
  ExtraFields: Map<string, string>;
  CostSource: string;
  Cost: number;
  CostDetails: string;
  ExtraInfo: string;
  Rated: boolean;  // Mark the CDR as rated so we do not process it during mediation
}

export class RPCCDRsFilter {
  CGRIDs: string[];          // If provided, it will filter based on the cgrids present in list
  NotCGRIDs: string[];          // Filter specific CgrIds out
  RunIDs: string[];          // If provided, it will filter on mediation runid
  NotRunIDs: string[];          // Filter specific runIds out
  OriginHosts: string[];          // If provided, it will filter cdrhost
  NotOriginHosts: string[];          // Filter out specific cdr hosts
  Sources: string[];          // If provided, it will filter cdrsource
  NotSources: string[];          // Filter out specific CDR sources
  ToRs: string[];          // If provided, filter on TypeOfRecord
  NotToRs: string[];          // Filter specific TORs out
  RequestTypes: string[];          // If provided, it will fiter reqtype
  NotRequestTypes: string[];          // Filter out specific request types
  Directions: string[];          // If provided, it will fiter direction
  NotDirections: string[];          // Filter out specific directions
  Tenants: string[];          // If provided, it will filter tenant
  NotTenants: string[];          // If provided, it will filter tenant
  Categories: string[];          // If provided, it will filter çategory
  NotCategories: string[];          // Filter out specific categories
  Accounts: string[];          // If provided, it will filter account
  NotAccounts: string[];          // Filter out specific Accounts
  Subjects: string[];          // If provided, it will filter the rating subject
  NotSubjects: string[];          // Filter out specific subjects
  DestinationPrefixes: string[];          // If provided, it will filter on destination prefix
  NotDestinationPrefixes: string[];          // Filter out specific destination prefixes
  Suppliers: string[];          // If provided, it will filter the supplier
  NotSuppliers: string[];          // Filter out specific suppliers
  DisconnectCauses: string[];          // Filter for disconnect Cause
  NotDisconnectCauses: string[];          // Filter out specific disconnect causes
  Costs: number;            // Query based on costs specified
  NotCosts: number;            // Filter out specific costs out from result
  ExtraFields: Map<string, string>; // Query based on extra fields content
  NotExtraFields: Map<string, string>; // Filter out based on extra fields content
  OrderIDStart: number;            // Export from this order identifier
  OrderIDEnd: number;            // Export smaller than this order identifier
  SetupTimeStart: string;            // Start of interval, bigger or equal than configured
  SetupTimeEnd: string;            // End interval, smaller than setupTime
  AnswerTimeStart: string;            // Start of interval, bigger or equal than configured
  AnswerTimeEnd: string;            // End interval, smaller than answerTime
  CreatedAtStart: string;            // Start of interval, bigger or equal than configured
  CreatedAtEnd: string;            // End interval, smaller than
  UpdatedAtStart: string;            // Start of interval, bigger or equal than configured
  UpdatedAtEnd: string;            // End interval, smaller than
  MinUsage: string;            // Start of the usage interval (>=)
  MaxUsage: string;            // End of the usage interval (<)
  MinPDD: string;            // Start of the pdd interval (>=)
  MaxPDD: string;            // End of the pdd interval (<)
  MinCost: number;            // Start of the cost interval (>=)
  MaxCost: number;            // End of the usage interval (<)
  Paginator: Paginator;         // Add pagination
}

export class UsageRecord {
  ToR: string;
  RequestType: string;
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
  Destination: string;
  SetupTime: string;
  AnswerTime: string;
  Usage: string;
  ExtraFields: Map<string, string>;
}


export class SMGenericEvent {
  CGRID: string;
  ToR: string;
  OriginID: string;
  OriginHost: string;
  Source: string;
  RequestType: string;
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
  Destination: string;
  SetupTime: string;
  AnswerTime: string;
  Usage: string;
  PDD: string;
  Supplier: string;
  DisconnectCause: string;
  RunID: string;
  Cost: string;
}

export class ArgsReplyFailedPosts {
  FailedRequestsInDir: string;  // if defined it will be our source of requests to be replayed
  FailedRequestsOutDir: string;  // if defined it will become our destination for files failing to be replayed, *none to be discarded
  Modules: string[]; // list of modules for which replay the requests, nil for all
  Transports: string[]; // list of transports
}

export class AttrActionPlan {
  ActionsId: string;  // Actions id
  Years: string;  // semicolon separated list of years this timing is valid on, *any or empty supported
  Months: string;  // semicolon separated list of months this timing is valid on, *any or empty supported
  MonthDays: string;  // semicolon separated list of month's days this timing is valid on, *any or empty supported
  WeekDays: string;  // semicolon separated list of week day names this timing is valid on *any or empty supported
  Time: string;  // String representing the time this timing starts on, *asap supported
  Weight: number; // Binding's weight
}

export class AttrAddAccountActionTriggers {
  Tenant: string;
  Account: string;
  ActionTriggerIDs: string[];
  ActionTriggerOverwrite: boolean;
  ActivationDate: string;
  Executed: boolean;
}

export class AttrAddAccountAliases {
  Tenant: string;
  Category: string;
  Account: string;
  Aliases: string[];
}

export class AttrAddActionTrigger {
  ActionTriggersId: string;
  Tenant: string;
  Account: string;
  ThresholdType: string;
  ThresholdValue: number;
  BalanceId: string;
  BalanceType: string;
  BalanceDirection: string;
  BalanceDestinationIds: string;
  BalanceRatingSubject: string;
  BalanceWeight: number;
  BalanceExpiryTime: string;
  BalanceSharedGroup: string;
  Weight: number;
  ActionsId: string;
}

export class AttrAddRatingSubjectAliases {
  Tenant: string;
  Category: string;
  Subject: string;
  Aliases: string[];
}

// AttrDebitUsageWithOptions represents the DebitUsage request
export class AttrDebitUsageWithOptions {
  UsageRecord: UsageRecord;
  AllowNegativeAccount: boolean; // allow account to go negative during debit
}

export class AttrGetActionPlan {
  ID: string;
}

export class AttrGetActionTriggers {
  GroupIDs: string[];
  constructor(_groupIds: string[]) {this.GroupIDs = _groupIds;}
}

export class AttrGetDataCost {
  Direction: string;
  Category: string;
  Tenant: string;
  Account: string;
  Subject: string;
  StartTime: string; // time.Time
  Usage: number; // the call duration so far (till TimeEnd)
}

export class AttrGetMetrics {
  StatsQueueId: string; // Id of the stats instance queried
}

export class AttrLoadCdrStats {
  TPid: string;
  CdrStatsId: string;
}

export class AttrLoadDestination {
  TPid: string;
  ID: string;
}

export class AttrLoadRatingPlan {
  TPid: string;
  RatingPlanId: string;
}

export class AttrLoadSharedGroup {
  TPid: string;
  SharedGroupId: string;
}

export class AttrReloadConfig {
  ConfigDir; string;
}

export class AttrRemActionTiming {
  ActionPlanId: string; // Id identifying the ActionTimings profile
  ActionTimingId: string; // Internal CGR id identifying particular ActionTiming, *all for all user related ActionTimings to be canceled
  Tenant: string; // Tenant the account belongs to
  Account: string; // Account name
  ReloadScheduler: boolean;   // If set it will reload the scheduler after adding
}

export class AttrRemDerivedChargers {
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
}

export class AttrRemoteLock {
  LockIDs: string[];     // List of IDs to obtain lock for
  Timeout: string; // time.Duration // Automatically unlock on timeout
}

export class AttrRemoveAccountActionTriggers {
  Tenant: string;
  Account: string;
  GroupID: string;
  UniqueID: string;
}

export class AttrRemoveActionTrigger {
  GroupID: string;
  UniqueID: string;
}

export class AttrRemoveActions {
  ActionIDs: string[];
}

export class AttrRemoveDestination {
  DestinationIDs: string[];
  Prefixes: string[];
}

export class AttrRemoveRatingProfile {
  Direction: string;
  Tenant: string;
  Category: string;
  Subject: string;
}

export class AttrResetAccountActionTriggers {
  Tenant: string;
  Account: string;
  GroupID: string;
  UniqueID: string;
  Executed: boolean;
}

export class AttrSetAccountActionTriggers {
  Tenant: string;
  Account: string;
  GroupID: string;
  UniqueID: string;
  ThresholdType: string;
  ThresholdValue: number;
  Recurrent: boolean;
  Executed: boolean;
  MinSleep: string;
  ExpirationDate: string;
  ActivationDate: string;
  BalanceID: string;
  BalanceType: string;
  BalanceDirections: string[];
  BalanceDestinationIds: string[];
  BalanceWeight: number;
  BalanceExpirationDate: string;
  BalanceTimingTags: string[];
  BalanceRatingSubject: string;
  BalanceCategories: string[];
  BalanceSharedGroups: string[];
  BalanceBlocker: boolean;
  BalanceDisabled: boolean;
  MinQueuedItems: number;
  ActionsID: string;
}

export class AttrSetActionPlan {
  Id: string;            // Profile id
  ActionPlan: AttrActionPlan[]; // Set of actions this Actions profile will perform
  Overwrite: boolean;              // If previously defined, will be overwritten
  ReloadScheduler: boolean;              // Enables automatic reload of the scheduler (eg: useful when adding a single action timing)
}

export class AccountActionTiming {
  ActionPlanId: string;    // The id of the ActionPlanId profile attached to the account
  Uuid: string;    // The id to reference this particular ActionTiming
  ActionsId: string;    // The id of actions which will be executed
  NextExecTime: string;    // Next execution time
}

export class AttrSetActionTrigger {
  GroupID: string;
  UniqueID: string;
  ThresholdType: string;
  ThresholdValue: number;
  Recurrent: boolean;
  MinSleep: string;
  ExpirationDate: string;
  ActivationDate: string;
  BalanceID: string;
  BalanceType: string;
  BalanceDirections: string[];
  BalanceDestinationIds: string[];
  BalanceExpirationDate: string;
  BalanceTimingTags: string[];
  BalanceRatingSubject: string;
  BalanceCategories: string[];
  BalanceSharedGroups: string[];
  BalanceBlocker: boolean;
  BalanceDisabled: boolean;
  MinQueuedItems: number;
  ActionsID: string;
}

export class AttrSetDerivedChargers {
  Direction: string;
  Tenant: string;
  Category: string;
  Account: string;
  Subject: string;
  DestinationIds: string;
  DerivedChargers: DerivedCharger[];
  Overwrite: boolean; // Do not overwrite if present in redis
}

export class AttrsExecuteScheduledActions {
  ActionPlanID: string;
  TimeStart: string;
  TimeEnd: string; // time.Time // replay the action timings between the two dates
}

export class DerivedChargers {
  DestinationIDs: Map<string, boolean>;
  Chargers: DerivedCharger[];
}

export class DerivedCharger {
  RunID: string; // Unique runId in the chain
  RunFilters: string; // Only run the charger if all the filters match
  RequestTypeField: string; // Field containing request export class info, number in case of csv source, '^' as prefix in case of static values
  DirectionField: string; // Field containing direction info
  TenantField: string; // Field containing tenant info
  CategoryField: string; // Field containing tor info
  AccountField: string; // Field containing account information
  SubjectField: string; // Field containing subject information
  DestinationField: string; // Field containing destination information
  SetupTimeField: string; // Field containing setup time information
  PDDField: string; // Field containing setup time information
  AnswerTimeField: string; // Field containing answer time information
  UsageField: string; // Field containing usage information
  SupplierField: string; // Field containing supplier information
  DisconnectCauseField: string; // Field containing disconnect cause information
  CostField: string; // Field containing cost information
  RatedField: string; // Field marking rated request in CDR
  // contains filtered or unexported fields
}

export class ActiveSession {
  CGRID: string;
  TOR: string;            // type of record, meta-field, should map to one of the TORs hardcoded inside the server <*voice|*data|*sms|*generic>
  OriginID: string;            // represents the unique accounting id given by the telecom switch generating the CDR
  CdrHost: string;            // represents the IP address of the host generating the CDR (automatically populated by the server)
  CdrSource: string;            // formally identifies the source of the CDR (free form field)
  ReqType: string;            // matching the supported request types by the **CGRateS**, accepted values are hardcoded in the server <prepaid|postpaid|pseudoprepaid|rated>
  Tenant: string;            // tenant whom this record belongs
  Category: string;            // free-form filter for this record, matching the category defined in rating profiles.
  Account: string;            // account id (accounting subsystem) the record should be attached to
  Subject: string;            // rating subject (rating subsystem) this record should be attached to
  Destination: string;            // destination to be charged
  SetupTime: string;            // set-up time of the event. Supported formats: datetime RFC3339 compatible, SQL datetime (eg: MySQL), unix timestamp.
  AnswerTime: string;            // answer time of the event. Supported formats: datetime RFC3339 compatible, SQL datetime (eg: MySQL), unix timestamp.
  Usage: number;            // event usage information (eg: in case of tor=*voice this will represent the total duration of a call)
  ExtraFields: string;            // Extra fields to be stored in CDR
  SMId: string;
  SMConnId: string;
  RunID: string;
  LoopIndex: number;            // indicates the position of this segment in a cost request loop
  DurationIndex: number;            // the call duration so far (till TimeEnd)
  MaxRate: number;
  MaxRateUnit: number;
  MaxCostSoFar: number;
  constructor(_tenant: string, _account: string) {this.Tenant = _tenant; this.Account = _account;}
}

export class Paginator {
  Limit: number;   // Limit the number of items returned
  Offset: number;   // Offset of the first item returned (eg: use Limit*Page in case of PerPage items)
  SearchTerm: string;   // Global matching pattern in items returned, partially used in some APIs
  constructor(_limit: number, _offset: number) {this.Limit = _limit; this.Offset = _offset}
}