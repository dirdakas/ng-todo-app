import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject, Observable } from 'rxjs';

import localeLt from '@angular/common/locales/lt';
import localeExtraLt from '@angular/common/locales/extra/lt';
import localeEnGb from '@angular/common/locales/en-GB';
import localeExtraEnGb from '@angular/common/locales/extra/en-GB';

registerLocaleData(localeLt, 'lt-lt', localeExtraLt);
registerLocaleData(localeEnGb, 'en-gb', localeExtraEnGb);

import { StorageService } from './../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject(null);
  currentLanguage$: Observable<string> = this.currentLanguageSubject
    .asObservable();

  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
  ) {}

  setLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
    this.storageService.setLocale(lang);
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
  }
}
