import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login.component';

import lt from './locale/lt-lt.json';
import enGb from './locale/en-gb.json';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
  constructor(private translate: TranslateService) {
    this.translate.setTranslation('lt-lt', lt, true);
    this.translate.setTranslation('en-gb', enGb, true);
  }
}
