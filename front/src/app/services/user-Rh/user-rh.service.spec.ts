import { TestBed } from '@angular/core/testing';

import { UserRhService } from './user-rh.service';

describe('UserRhService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRhService = TestBed.get(UserRhService);
    expect(service).toBeTruthy();
  });
});
