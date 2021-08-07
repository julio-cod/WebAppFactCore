import { TestBed } from '@angular/core/testing';

import { DatatransitoService } from './datatransito.service';

describe('DatatransitoService', () => {
  let service: DatatransitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatatransitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
