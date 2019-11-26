import { Injectable, Injector} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { StorageService } from '../storage/storage.service';

import { Observable, of } from 'rxjs';

// Cool library to deal with errors: https://www.stacktracejs.com
import * as StackTraceParser from 'error-stack-parser';

export interface IErrorToSend {
  name: any;
  appId: any;
  user: any;
  time: any;
  id: any;
  url: any;
  status: any;
  message: any;
  stack: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(
    private injector: Injector,
    private storageService: StorageService
  ) { }

  log(error): Observable<any> {
    // @TODO: implement loggin setting from environment settings

    // Log the error to the console
    console.error(error);

    // Send error to server
    const errorToSend = this.addContextInfo(error);

    // @TODO: implement errors endpoint and send this error ar log

    this.storageService.storeError(error);

    return fakeHttpService.post(errorToSend);
  }

  addContextInfo(error): IErrorToSend {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const name = error.name || null;
    // const appId =  // @TODO: get mobile/pc some sort of uniq index
    const appId = 1;
    const user = null; // @TODO get username / token to check for which user it happened
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);
    const errorToSend: IErrorToSend = {name, appId, user, time, id, url, status, message, stack};

    return errorToSend;
  }
}

class fakeHttpService {
  static post(error): Observable<any> {
    console.log('Error sent to the server: ', error);
    return of(error);
  }
}
