import {Component, OnInit} from '@angular/core';
import {CacheStats} from '../../../../shared/entities/cgrates/Types';
import {CGRatesService} from '../../../../shared/services/cgrates.service';
import {LoggerService} from '../../../../shared/services/logger.service';

@Component({
  selector: 'app-cachestats',
  templateUrl: './cachestats.component.html',
  styleUrls: ['./cachestats.component.scss']
})
export class CacheStatsComponent implements OnInit {

  cacheStats: CacheStats;

  constructor(
    private _cgratesService: CGRatesService,
    private _logger: LoggerService
  ) {}
  
  ngOnInit() {
    setInterval(() => {this.getCacheStats()}, 5000);
  }

  getCacheStats() {
    this._cgratesService.GetCacheStats()
      .then((response) => {
        this.cacheStats = response;
      })
      .catch(err => {
        this._logger.error('GetCacheStats:' + err);
      });
  }
}
