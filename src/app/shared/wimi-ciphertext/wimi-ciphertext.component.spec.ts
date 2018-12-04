import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WimiCiphertextComponent } from './wimi-ciphertext.component';

describe('WimiCiphertextComponent', () => {
  let component: WimiCiphertextComponent;
  let fixture: ComponentFixture<WimiCiphertextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WimiCiphertextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WimiCiphertextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
