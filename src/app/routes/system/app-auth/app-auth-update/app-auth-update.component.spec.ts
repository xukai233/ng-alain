import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAuthUpdateComponent } from './app-auth-update.component';

describe('AppAuthUpdateComponent', () => {
  let component: AppAuthUpdateComponent;
  let fixture: ComponentFixture<AppAuthUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAuthUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAuthUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
