import { TestBed } from '@angular/core/testing';

import { TokenStorage } from './token-storage.service';

describe('TokenStorage', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenStorage = TestBed.get(TokenStorage);
    expect(service).toBeTruthy();
  });
});
