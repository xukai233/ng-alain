import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCreateModalComponent } from './register-create-modal.component';

describe('RegisterCreateModalComponent', () => {
  let component: RegisterCreateModalComponent;
  let fixture: ComponentFixture<RegisterCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
