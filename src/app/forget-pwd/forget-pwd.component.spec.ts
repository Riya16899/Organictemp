import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPWDComponent } from './forget-pwd.component';

describe('ForgetPWDComponent', () => {
  let component: ForgetPWDComponent;
  let fixture: ComponentFixture<ForgetPWDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPWDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPWDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
