import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WimiSelectBoardComponent } from './wimi-select-board.component';

describe('WimiSelectBoardComponent', () => {
  let component: WimiSelectBoardComponent;
  let fixture: ComponentFixture<WimiSelectBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WimiSelectBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WimiSelectBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
