import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WimiNameChangeComponent } from './wimi-name-change.component';

describe('WimiNameChangeComponent', () => {
  let component: WimiNameChangeComponent;
  let fixture: ComponentFixture<WimiNameChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WimiNameChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WimiNameChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
