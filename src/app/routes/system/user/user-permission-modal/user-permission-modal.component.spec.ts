import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionModalComponent } from './user-permission-modal.component';

describe('UserPermissionModalComponent', () => {
  let component: UserPermissionModalComponent;
  let fixture: ComponentFixture<UserPermissionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPermissionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
