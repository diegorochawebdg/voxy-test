import { TestBed } from '@angular/core/testing';

import { TableInfoService } from './table-info.service';

describe('TableInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableInfoService = TestBed.get(TableInfoService);
    expect(service).toBeTruthy();
  });
});
