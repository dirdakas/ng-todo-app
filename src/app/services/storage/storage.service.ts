import { Injectable } from '@angular/core';

import { IUserData } from './../../models/user-data.model';

export interface ILocalError {
  date: string;
  error: any;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static ERROR_LOG_KEY: string = 'error_log';
  static LOCALE_KEY: string = 'locale';
  static USER_DATA_KEY: string = 'user';

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearStorageData(): void {
    sessionStorage.clear();
  }

  storeError(error): void {
    const newError: ILocalError = {
      date: new Date().toISOString(),
      error
    };

    const errorList: ILocalError[] = this.getStoredErrors();

    errorList.push(newError);

    sessionStorage.setItem(
      StorageService.ERROR_LOG_KEY,
      JSON.stringify(errorList)
    );
  }

  // @TODO: implement maybe page for this? if no - remove it
  getStoredErrors(): ILocalError[] {
    const errors: string = sessionStorage.getItem(StorageService.ERROR_LOG_KEY);

    if (errors) {
      return JSON.parse(errors);
    }

    return [];
  }

  setLocale(lang: string): void {
    sessionStorage.setItem(
      StorageService.LOCALE_KEY,
      lang
    );
  }

  getLocale(): string {
    return sessionStorage
      .getItem(StorageService.LOCALE_KEY);
  }

  setUserData(userData: IUserData): void {
    if (userData) {
      sessionStorage.setItem(
        StorageService.USER_DATA_KEY,
        JSON.stringify(userData)
      );
    } else {
      this.clearStorageData();
    }
  }

  getUserData(): IUserData {
    const result: string = sessionStorage
      .getItem(StorageService.USER_DATA_KEY);

    return result ? JSON.parse(result) : null;
  }
}
