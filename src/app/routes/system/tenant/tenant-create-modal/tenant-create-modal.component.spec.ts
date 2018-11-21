import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTenantModalComponent } from './tenant-create-modal.component';

describe('CreateTenantModalComponent', () => {
  let component: CreateTenantModalComponent;
  let fixture: ComponentFixture<CreateTenantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTenantModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTenantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
