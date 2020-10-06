import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenVerificationComponent } from './gen-verification.component';

describe('GenVerificationComponent', () => {
  let component: GenVerificationComponent;
  let fixture: ComponentFixture<GenVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
