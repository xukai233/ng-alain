import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantUpdateModalComponent } from './tenant-update-modal.component';

describe('TenantUpdateModalComponent', () => {
  let component: TenantUpdateModalComponent;
  let fixture: ComponentFixture<TenantUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
