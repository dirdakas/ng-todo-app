import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IUserData } from './../../models/user-data.model';
import { StorageService } from './../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<IUserData>(undefined);
  userData$: Observable<IUserData> = this.userDataSubject.asObservable();

  constructor(
    private storageService: StorageService,
  ) {
    const userInStorage: IUserData = this.storageService.getUserData();

    if (userInStorage) {
      this.setUserData(userInStorage);
    }
  }

  setUserData(user: IUserData): void {
    this.storageService.setUserData(user);
    this.userDataSubject.next(user);
  }

  getUserData(): IUserData {
    return this.userDataSubject.getValue();
  }
}
