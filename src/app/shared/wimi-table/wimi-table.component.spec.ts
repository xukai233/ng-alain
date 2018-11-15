import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WimiTableComponent } from './wimi-table.component';

describe('WimiTableComponent', () => {
  let component: WimiTableComponent;
  let fixture: ComponentFixture<WimiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WimiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WimiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
