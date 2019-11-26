import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { AnimationBuilder } from '@angular/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { of, Observable } from 'rxjs';

import { GlobalErrorHandler } from './global-error-handler.service';
import { ErrorsService } from '../errors/errors.service';
import { LoginComponent } from '../../pages/login/login.component';
import { LoginModule } from '../../pages/login/login.module';

describe('Service: GlobalErrorHandler', () => {
  const MOCK_ERROR_MSG: string = 'this is an error';
  const MOCK_ERROR_RESPONSE: HttpErrorResponse = new HttpErrorResponse({
    error: {
      Errors: [
        {
          ErrorMessage: MOCK_ERROR_MSG
        }
      ],
      message: 'Http failure response for http://localhost:4200/api/auth: 409 0',
      name: 'HttpErrorResponse',
      ok: false,
    },
    status: 409,
    statusText: '0',
    url: 'http://localhost:4200/api/auth',
  });

  const MOCK_ERROR_SERVICE = {
    log: (data: any): Observable<any> => {
      return of({});
    }
  }

  let errorsService: jasmine.SpyObj<ErrorsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LoginComponent, // any component just for a mock up
          },
        ]),
        LoginModule,
      ],
      providers: [
        GlobalErrorHandler,
        {
          provide: ErrorsService,
          useValue: MOCK_ERROR_SERVICE
        },
        AnimationBuilder,
      ]
    });

    errorsService = TestBed.get(ErrorsService);
  });

  it('should create', inject([GlobalErrorHandler], (service: GlobalErrorHandler) => {
    expect(service)
      .toBeTruthy();
  }));

  it('should log error via errorsService', inject([
    GlobalErrorHandler,
    ErrorsService
  ], (
    service: GlobalErrorHandler,
    errorsService: ErrorsService,
  ) => {
    spyOn(errorsService, 'log')
      .and
      .callThrough();

    service.handleError(MOCK_ERROR_RESPONSE);

    expect(errorsService.log)
      .toHaveBeenCalled();
    expect(errorsService.log)
      .toHaveBeenCalledWith(MOCK_ERROR_RESPONSE);
  }));
});
