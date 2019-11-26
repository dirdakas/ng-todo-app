import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainNavComponent } from './main-nav.component';

import lt from './locale/lt-lt.json';
import enGb from './locale/en-gb.json';

@NgModule({
  declarations: [
    MainNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    TranslateModule.forChild(),
  ],
  exports: [
    MainNavComponent,
  ]
})
export class MainNavModule {
  constructor(private translate: TranslateService) {
    this.translate.setTranslation('lt-lt', lt, true);
    this.translate.setTranslation('en-gb', enGb, true);
  }
}
