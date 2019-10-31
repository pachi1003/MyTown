import { TestBed } from '@angular/core/testing';

import { AyuntamientosService } from './ayuntamientos.service';

describe('AyuntamientosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AyuntamientosService = TestBed.get(AyuntamientosService);
    expect(service).toBeTruthy();
  });
});
