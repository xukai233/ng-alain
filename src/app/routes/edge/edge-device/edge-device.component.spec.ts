import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeDeviceComponent } from './edge-device.component';

describe('EdgeDeviceComponent', () => {
  let component: EdgeDeviceComponent;
  let fixture: ComponentFixture<EdgeDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
