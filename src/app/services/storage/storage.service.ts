import { Injectable } from '@angular/core';

export interface ILocalError {
  date: string,
  error: any
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static ERROR_LOG_KEY: string = 'error_log';

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
      error: error
    };

    let errorList: ILocalError[] = this.getStoredErrors();

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
}
