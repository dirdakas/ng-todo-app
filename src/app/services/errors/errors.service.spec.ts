import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationStrategy } from '@angular/common';

import { ErrorsService } from './errors.service';
import { StorageService } from '../storage/storage.service';

describe('ErrorsService', () => {
  let errorsService: ErrorsService;

  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        LocationStrategy,
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', [
            'storeError'
          ]),
        }
      ]
    });

    storageService = TestBed.get(StorageService);
  });

  it('should be created', () => {
    errorsService = TestBed.get(ErrorsService);
    expect(errorsService)
      .toBeTruthy();
  });
});
