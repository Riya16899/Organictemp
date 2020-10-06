import { TestBed } from '@angular/core/testing';

import { GenVerificationService } from './gen-verification.service';

describe('GenVerificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenVerificationService = TestBed.get(GenVerificationService);
    expect(service).toBeTruthy();
  });
});
