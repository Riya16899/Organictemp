import { TestBed } from '@angular/core/testing';

import { ForgetpwdService } from './forgetpwd.service';

describe('ForgetpwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgetpwdService = TestBed.get(ForgetpwdService);
    expect(service).toBeTruthy();
  });
});
