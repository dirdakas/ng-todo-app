import { Injectable } from '@angular/core';
import {
  AnimationBuilder,
  style,
  animate,
  AnimationFactory
} from '@angular/animations';

import { BehaviorSubject, Observable } from 'rxjs';

import { ColorsEnum } from '../../enums/colors.enum';
import { IGlobalNotification } from '../../models/global-notification.model';
import { NotificationTypeEnum, INotificationColors } from '../../enums/notificationType.enum';

@Injectable({
  providedIn: 'root'
})
export class GlobalNotificationsService {
  private notificationsSubject = new BehaviorSubject([]);
  notifications$: Observable<IGlobalNotification[]> = this.notificationsSubject
    .asObservable();

  constructor(private animationBuilder: AnimationBuilder) { }

  addNotification(notification: IGlobalNotification): void {
    const newNotificationList: IGlobalNotification[] = this.notificationsSubject
      .getValue();

    const lastNotificationInList: IGlobalNotification = this.getLastNotification();
    const id: number = lastNotificationInList ?
      (lastNotificationInList.id + 1) :
      0;
    const newMessage: IGlobalNotification = {
      id: id,
      isClosable: notification.isClosable,
      message: notification.message,
      type: notification.type,
      autoCloseTime: notification.autoCloseTime ?
        notification.autoCloseTime :
        null
    };

    newNotificationList
      .push(newMessage);
    this.notificationsSubject
      .next(newNotificationList);
  }

  removeNotification(id: number): void {
    let newNotificationList = this.getAllNotifications();
    newNotificationList = newNotificationList
      .filter((notification: IGlobalNotification) => {
        return notification.id !== id;
      });
    this.notificationsSubject
      .next(newNotificationList);
  }

  getCreationAnimation(
    notification: IGlobalNotification
  ): AnimationFactory {
    const colors: INotificationColors = this.getNotificationColors(notification);

    return this.animationBuilder.build([
      style({
        opacity: 0,
        backgroundColor: colors.background,
        color: colors.color,
      }),
      animate(400, style({
        opacity: 0.6,
        padding: '10px 5px'
      })),
      animate(1000, style({
        opacity: 1,
        padding: '10px 5px'
      }))
    ]);
  }

  getRemovalAnimation(): AnimationFactory {
    return this.animationBuilder.build([
      style({
        opacity: 1,
        transform: 'translateY(0)'
      }),
      animate(500, style({
        opacity: 0,
        transform: 'translateY(-100px)',
        'z-index': 100
      }))
    ]);
  }

  addTypedNotification(
    message: string,
    type: NotificationTypeEnum,
    autoCloseTime: number = null
  ): void {
    const notification: IGlobalNotification = {
      id: 0,
      message: message,
      isClosable: true,
      type: type,
      autoCloseTime: autoCloseTime
    };
    this.addNotification(notification);
  }

  getAllNotifications(): IGlobalNotification[] {
    return [ ...this.notificationsSubject.getValue() ];
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }

  private getLastNotification(): IGlobalNotification {
    let notifications: IGlobalNotification[] = this.notificationsSubject
      .getValue();

    if (notifications.length > 0) {
      return { ...notifications.slice(-1)[0] }
    } else {
      return null;
    }
  }

  private getNotificationColors(
    notification: IGlobalNotification
  ): INotificationColors {
    let result: INotificationColors = {
      background: ColorsEnum.fairPink,
      color: ColorsEnum.blazeOrange
    };

    switch (notification.type) {
      case NotificationTypeEnum.error:
        result = {
          background: ColorsEnum.errorLight,
          color: ColorsEnum.errorDark
        };
        break;
      case NotificationTypeEnum.warn:
        result = {
          background: ColorsEnum.warningLight,
          color: ColorsEnum.warningDark
        };
        break;
      case NotificationTypeEnum.info:
        result = {
          background: ColorsEnum.infoLight,
          color: ColorsEnum.infoDark
        };
        break;
      case NotificationTypeEnum.success:
        result = {
          background: ColorsEnum.successLight,
          color: ColorsEnum.successDark
        };
        break;
      default:
        break;
    }

    return result;
  }
}
