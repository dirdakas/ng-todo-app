export enum NotificationTypeEnum {
  error = 'error',
  info = 'info',
  warn = 'warning',
  success = 'success'
}

export interface INotificationColors {
  color: string;
  background: string;
}
