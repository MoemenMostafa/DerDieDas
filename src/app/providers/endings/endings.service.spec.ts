import { TestBed } from '@angular/core/testing';

import { EndingsService } from './endings.service';

describe('EndingsService', () => {
  let service: EndingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
