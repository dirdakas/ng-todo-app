import {
  ErrorHandler,
  Injectable,
  Injector,
  isDevMode
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorsService } from '../errors/errors.service';
import { GlobalNotificationsService } from '../global-notifications/global-notifications.service';
import { NotificationTypeEnum } from '../../enums/notificationType.enum';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler extends ErrorHandler {

  // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
  constructor(private injector: Injector) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    const globalNotificationsService = this.injector.get(GlobalNotificationsService);
    const errorsService = this.injector.get(ErrorsService);

    if (isDevMode()) {
      console.log('error', error);
    }

    if (error instanceof HttpErrorResponse) {
    // Server error happened      
      if (!navigator.onLine) {
        // No Internet connection
        return globalNotificationsService
          .addTypedNotification(
            'No Internet connection', // @TODO: translation
            NotificationTypeEnum.warn
          );
      }

      // Http Error
      // Send the error to the server
      errorsService.log(error)
        .subscribe();

      // Show notification to the user
      if (error.error && error.error.Errors && error.error.Errors[0]) {
        globalNotificationsService.addTypedNotification(
          error.error.Errors[0].ErrorMessage,
          NotificationTypeEnum.error,
        );
      } else {
        globalNotificationsService.addTypedNotification(
          error.statusText,
          NotificationTypeEnum.error,
        );
      }
    } else {
      // Client Error Happend
      // @TODO: do something like redirect to error page
      errorsService.log(error)
        .subscribe();
    }
  }
}
