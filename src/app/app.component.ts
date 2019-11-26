import { Component, OnInit } from '@angular/core';

import { TranslationService } from './services/translation/translation.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  static DEFAULT_LOCALE: string = 'lt-lt';

  title = 'todo-app';

  constructor(
    private translationService: TranslationService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.checkLocale();
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
}
