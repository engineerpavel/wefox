import { TestBed } from '@angular/core/testing';

import { CrudTableService } from './crud-table.service';

describe('CrudTableService', () => {
  let service: CrudTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
