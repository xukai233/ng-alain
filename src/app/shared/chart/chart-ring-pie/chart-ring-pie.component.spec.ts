import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRingPieComponent } from './chart-ring-pie.component';

describe('ChartRingPieComponent', () => {
  let component: ChartRingPieComponent;
  let fixture: ComponentFixture<ChartRingPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRingPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRingPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
