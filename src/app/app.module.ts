import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { ErrorsService } from './services/errors/errors.service';
import { GlobalNotificationsService } from './services/global-notifications/global-notifications.service';
import { StorageService } from './services/storage/storage.service';
import { GlobalErrorHandler } from './services/global-error-handler/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    ErrorsService,
    GlobalNotificationsService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
