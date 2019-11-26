import { TestBed } from '@angular/core/testing';

import { StorageService, ILocalError } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;

  let store = {};
  let sessionStorage_MOCK = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
  const MOCK_ERROR_1: string = 'This is an error #1';
  const MOCK_ERROR_2: string = 'This is an error #2';
  const MOCK_STORED_RESULT: ILocalError[] = [
    {
      date: new Date().toISOString(),
      error: MOCK_ERROR_1
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});

    storageService = TestBed.get(StorageService);
  });

  it('should be created', () => {
    expect(storageService)
      .toBeTruthy();
  });

  it('should check setItem', () => {
    const key: string = 'key';
    const val: string = 'value';
    spyOn(sessionStorage, 'setItem')
      .and
      .callFake(sessionStorage_MOCK.setItem);

    storageService.setItem(key, val);

    expect(sessionStorage.setItem)
      .toHaveBeenCalled();
    expect(sessionStorage.setItem)
      .toHaveBeenCalledWith(key, val);
  });

  it('should check getItem', () => {
    const key: string = 'key';
    spyOn(sessionStorage, 'getItem')
      .and
      .callFake(sessionStorage_MOCK.getItem);

    storageService.getItem(key);

    expect(sessionStorage.getItem)
      .toHaveBeenCalled();
    expect(sessionStorage.getItem)
      .toHaveBeenCalledWith(key);
  });

  it('should check removeItem', () => {
    const key: string = 'key';
    spyOn(sessionStorage, 'removeItem')
      .and
      .callFake(sessionStorage_MOCK.removeItem);

    storageService.removeItem(key);

    expect(sessionStorage.removeItem)
      .toHaveBeenCalled();
    expect(sessionStorage.removeItem)
      .toHaveBeenCalledWith(key);
  });

  it('should clearStorageData', () => {
    spyOn(sessionStorage, 'clear')
      .and
      .callThrough();
    
    storageService.clearStorageData();

    expect(sessionStorage.clear)
      .toHaveBeenCalled();
  });

  describe('should store errors on sessionStorage', () => {
    it('should store first time error', () => {
      storageService.clearStorageData();

      spyOn(sessionStorage, 'getItem')
        .and
        .returnValues(
          null,
          JSON.stringify(MOCK_STORED_RESULT)
        );
      spyOn(sessionStorage, 'setItem')
        .and
        .callThrough();

      storageService.storeError(MOCK_ERROR_1);

      const errors: ILocalError[] = storageService.getStoredErrors();

      expect(sessionStorage.getItem)
        .toHaveBeenCalled();
      expect(sessionStorage.getItem)
        .toHaveBeenCalledWith(StorageService.ERROR_LOG_KEY);
      expect(sessionStorage.setItem)
        .toHaveBeenCalled();
      expect(errors[0].error)
        .toEqual(MOCK_ERROR_1);
    });

    it('should store second time error', () => {
      storageService.clearStorageData();

      const MOCK_STORED_RESULT_2: ILocalError[] = [
        {
          date: new Date().toISOString(),
          error: MOCK_ERROR_1
        },
        {
          date: new Date().toISOString(),
          error: MOCK_ERROR_2
        }
      ];

      spyOn(sessionStorage, 'getItem')
        .and
        .returnValues(
          null,
          JSON.stringify(MOCK_STORED_RESULT),
          JSON.stringify(MOCK_STORED_RESULT_2)
        );
      spyOn(sessionStorage, 'setItem')
        .and
        .callThrough();

      storageService.storeError(MOCK_ERROR_1);
      storageService.storeError(MOCK_ERROR_2);

      const errors: ILocalError[] = storageService.getStoredErrors();

      expect(sessionStorage.getItem)
        .toHaveBeenCalled();
      expect(sessionStorage.getItem)
        .toHaveBeenCalledWith(StorageService.ERROR_LOG_KEY);
      expect(sessionStorage.setItem)
        .toHaveBeenCalled();
      expect(errors[0].error)
        .toEqual(MOCK_ERROR_1);
      expect(errors[1].error)
        .toEqual(MOCK_ERROR_2);
    });
  });
});
