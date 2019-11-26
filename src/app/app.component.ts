import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TranslationService } from './services/translation/translation.service';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';
import { IUserData } from './models/user-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  static DEFAULT_LOCALE: string = 'lt-lt';

  isUserLoggedIn: boolean;

  private userSub: Subscription;

  constructor(
    private translationService: TranslationService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkLocale();
    this.checkUser();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  private checkLocale(): void {
    const locale: string = this.storageService.getLocale();
    this.translationService
      .setLanguage(
        locale ?
          locale :
          AppComponent.DEFAULT_LOCALE
      );
  }

  private checkUser(): void {
    this.userSub = this.userService
      .userData$
      .pipe(
        tap((userData: IUserData) => {
          this.isUserLoggedIn = !!userData;

          if (userData) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['login']);
          }
        })
      )
      .subscribe();
  }
}
