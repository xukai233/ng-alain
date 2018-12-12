import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditModalComponent } from './device-edit-modal.component';

describe('DeviceEditModalComponent', () => {
  let component: DeviceEditModalComponent;
  let fixture: ComponentFixture<DeviceEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
