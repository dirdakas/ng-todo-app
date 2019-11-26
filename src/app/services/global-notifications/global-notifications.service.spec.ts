import { TestBed } from '@angular/core/testing';
import { AnimationBuilder } from '@angular/animations';

import { GlobalNotificationsService } from './global-notifications.service';
import { IGlobalNotification } from '../../models/global-notification.model';
import { NotificationTypeEnum } from '../../enums/notificationType.enum';
import { ColorsEnum } from '../../enums/colors.enum';

describe('GlobalNotificationsService', () => {
  let globalNotificationsService: GlobalNotificationsService;
  let animationBuilder: jasmine.SpyObj<AnimationBuilder>;

  let MOCK_NOTIFICATION_ERROR_CLOSABLE: IGlobalNotification = {
    isClosable: true,
    message: 'Mock message 1',
    type: NotificationTypeEnum.error,
    id: 0,
    autoCloseTime: null
  };
  let MOCK_NOTIFICATION_WARNING_NOT_CLOSABLE: IGlobalNotification = {
    isClosable: false,
    message: 'Mock message 2',
    type: NotificationTypeEnum.warn,
    id: 1,
    autoCloseTime: null
  };
  let MOCK_CREATION_ANIMATION_STYLE: any[] = [
    {
      type: 6,
      styles: {
        opacity: 0,
        backgroundColor: ColorsEnum.errorLight,
        color: ColorsEnum.errorDark
      },
      offset: null
    },
    {
      type: 4,
      styles: {
        type: 6,
        styles: {
          opacity: 0.6,
          padding: '10px 5px'
        },
        offset: null
      },
      timings: 400
    },
    {
      type: 4,
      styles: {
        type: 6,
        styles: {
          opacity: 1,
          padding: '10px 5px'
         },
         offset: null
       },
       timings: 1000
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AnimationBuilder,
          useValue: jasmine.createSpyObj('AnimationBuilder', [
            'build'
          ]),
        },
        GlobalNotificationsService,
      ]
    });

    animationBuilder = TestBed.get(AnimationBuilder);
    globalNotificationsService = TestBed.get(GlobalNotificationsService);
  });

  it('should be created', () => {
    expect(globalNotificationsService)
      .toBeTruthy();
  });

  describe('should add notification', () => {
    it('should add FIRST notification error', () => {
      let notifications: IGlobalNotification[] = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([]);

      globalNotificationsService.addNotification(MOCK_NOTIFICATION_ERROR_CLOSABLE);
      
      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([MOCK_NOTIFICATION_ERROR_CLOSABLE]);
    });

    it('should add two notifications and have different ID\'s', () => {
      let notifications: IGlobalNotification[] = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([]);

      globalNotificationsService.addNotification(MOCK_NOTIFICATION_ERROR_CLOSABLE);
      globalNotificationsService.addNotification(MOCK_NOTIFICATION_WARNING_NOT_CLOSABLE);

      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual(
          [
            MOCK_NOTIFICATION_ERROR_CLOSABLE,
            MOCK_NOTIFICATION_WARNING_NOT_CLOSABLE
          ]
        );
    });

    it('should add FIRST notification error with no autoCloseTime', () => {
      globalNotificationsService.clearNotifications();
      let notifications: IGlobalNotification[] = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([]);

      globalNotificationsService.addNotification(MOCK_NOTIFICATION_ERROR_CLOSABLE);
      
      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([ MOCK_NOTIFICATION_ERROR_CLOSABLE ]);
      expect(notifications[0].autoCloseTime)
        .toBeNull();
    });

    it('should add FIRST notification error with autoCloseTime', () => {
      globalNotificationsService.clearNotifications();
      let notifications: IGlobalNotification[] = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([]);

      const notification: IGlobalNotification = Object.assign(
        [],
        MOCK_NOTIFICATION_ERROR_CLOSABLE
      );
      notification.autoCloseTime = 1000;

      globalNotificationsService.addNotification(notification);
      
      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications[0].autoCloseTime)
        .toEqual(1000);
    });
  });

  describe('should remove notification', () => {
    it('should remove notification by id', () => {
      let notifications: IGlobalNotification[] = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([]);
      globalNotificationsService.addNotification(MOCK_NOTIFICATION_ERROR_CLOSABLE);
      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([MOCK_NOTIFICATION_ERROR_CLOSABLE]);

      globalNotificationsService.removeNotification(MOCK_NOTIFICATION_ERROR_CLOSABLE.id);

      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([]);
    });

    it('should not remove notification by id (provided incorrect notificationId)', () => {
      let notifications: IGlobalNotification[] = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([]);
      globalNotificationsService.addNotification(MOCK_NOTIFICATION_ERROR_CLOSABLE);
      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([MOCK_NOTIFICATION_ERROR_CLOSABLE]);

      globalNotificationsService.removeNotification(MOCK_NOTIFICATION_WARNING_NOT_CLOSABLE.id);

      notifications = globalNotificationsService
        .getAllNotifications();
      expect(notifications)
        .toEqual([MOCK_NOTIFICATION_ERROR_CLOSABLE]);
    });
  });

  it('should getCreationAnimation', () => {
    animationBuilder.build
      .and
      .callThrough();
    globalNotificationsService.getCreationAnimation(MOCK_NOTIFICATION_ERROR_CLOSABLE);
    expect(animationBuilder.build)
      .toHaveBeenCalled();
  });

  it('should getRemovalAnimation', () => {
    animationBuilder.build
      .and
      .callThrough();
    globalNotificationsService.getRemovalAnimation();
    expect(animationBuilder.build)
      .toHaveBeenCalled();
  });

  it('should add typed notification', () => {
    let notifications: IGlobalNotification[] = globalNotificationsService
      .getAllNotifications();
    expect(notifications)
      .toEqual([]);

    const msg: string = 'this is a really good message';
    const type: NotificationTypeEnum = NotificationTypeEnum.info;
    const expectedResult: IGlobalNotification = {
      id: 0,
      isClosable: true,
      message: 'this is a really good message',
      type: 'info',
      autoCloseTime: null
    };
    spyOn(globalNotificationsService, 'addNotification')
      .and
      .callThrough();

    globalNotificationsService.addTypedNotification(msg, type);

    notifications = globalNotificationsService
      .getAllNotifications();

    expect(globalNotificationsService.addNotification)
      .toHaveBeenCalled();
    expect(globalNotificationsService.addNotification)
      .toHaveBeenCalledWith(expectedResult);
    expect(notifications)
      .toEqual([expectedResult]);    
  });

  describe('should get different animation types of notifications', () => {
    it('should getCreationAnimation for `error` type', () => {
      animationBuilder.build
        .and
        .callThrough();
      MOCK_CREATION_ANIMATION_STYLE[0].styles.backgroundColor = ColorsEnum.errorLight;
      MOCK_CREATION_ANIMATION_STYLE[0].styles.color = ColorsEnum.errorDark;
      globalNotificationsService.getCreationAnimation(MOCK_NOTIFICATION_ERROR_CLOSABLE);
      expect(animationBuilder.build)
        .toHaveBeenCalled();
      expect(animationBuilder.build)
        .toHaveBeenCalledWith(MOCK_CREATION_ANIMATION_STYLE);
    });

    it('should getCreationAnimation for `warning` type', () => {
      animationBuilder.build
        .and
        .callThrough();
      MOCK_CREATION_ANIMATION_STYLE[0].styles.backgroundColor = ColorsEnum.warningLight;
      MOCK_CREATION_ANIMATION_STYLE[0].styles.color = ColorsEnum.warningDark;
      globalNotificationsService.getCreationAnimation(MOCK_NOTIFICATION_WARNING_NOT_CLOSABLE);
      expect(animationBuilder.build)
        .toHaveBeenCalled();
      expect(animationBuilder.build)
        .toHaveBeenCalledWith(MOCK_CREATION_ANIMATION_STYLE);
    });

    it('should getCreationAnimation for `info` type', () => {
      animationBuilder.build
        .and
        .callThrough();
      const MOCK_NOTIFICATION: IGlobalNotification = {
        isClosable: true,
        message: 'Mock message 1',
        type: NotificationTypeEnum.info,
        id: 0
      };
      MOCK_CREATION_ANIMATION_STYLE[0].styles.backgroundColor = ColorsEnum.infoLight;
      MOCK_CREATION_ANIMATION_STYLE[0].styles.color = ColorsEnum.infoDark;
      globalNotificationsService.getCreationAnimation(MOCK_NOTIFICATION);
      expect(animationBuilder.build)
        .toHaveBeenCalled();
      expect(animationBuilder.build)
        .toHaveBeenCalledWith(MOCK_CREATION_ANIMATION_STYLE);
    });

    it('should getCreationAnimation for `success` type', () => {
      animationBuilder.build
        .and
        .callThrough();
      const MOCK_NOTIFICATION: IGlobalNotification = {
        isClosable: true,
        message: 'Mock message 1',
        type: NotificationTypeEnum.success,
        id: 0
      };
      MOCK_CREATION_ANIMATION_STYLE[0].styles.backgroundColor = ColorsEnum.successLight;
      MOCK_CREATION_ANIMATION_STYLE[0].styles.color = ColorsEnum.successDark;
      globalNotificationsService.getCreationAnimation(MOCK_NOTIFICATION);
      expect(animationBuilder.build)
        .toHaveBeenCalled();
      expect(animationBuilder.build)
        .toHaveBeenCalledWith(MOCK_CREATION_ANIMATION_STYLE);
    });
  });
});
