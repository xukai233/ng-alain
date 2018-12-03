import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAuthCreateComponent } from './app-auth-create.component';

describe('AppAuthCreateComponent', () => {
  let component: AppAuthCreateComponent;
  let fixture: ComponentFixture<AppAuthCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAuthCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAuthCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
