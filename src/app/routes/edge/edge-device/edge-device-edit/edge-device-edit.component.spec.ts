import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeDeviceEditComponent } from './edge-device-edit.component';

describe('EdgeDeviceEditComponent', () => {
  let component: EdgeDeviceEditComponent;
  let fixture: ComponentFixture<EdgeDeviceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeDeviceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeDeviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
