import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheStatsComponent } from './cachestats.component';

describe('CacheStatsComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<CacheStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
