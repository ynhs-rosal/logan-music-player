import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthorizationService } from './authorization.service';
import { mockAuthToken } from '../model/mocks/auth-token.mock';
import { Error } from '../model/error.model';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthorizationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  describe('authorize$', () => {
    it('should return authorization tokens', (done) => {
      spyOn(window.sessionStorage, 'setItem');
      service.authorize$('ABC123').subscribe((actualAuthToken) => {
        expect(actualAuthToken).toEqual(mockAuthToken);
        done();
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
      });

      req.flush(mockAuthToken);
    });
    it('should set sessionStorage with authorization tokens', (done) => {
      spyOn(window.sessionStorage, 'setItem');
      service.authorize$('ABC123').subscribe(() => {
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
          'access_token',
          mockAuthToken.access_token
        );
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
          'token_type',
          mockAuthToken.token_type
        );
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
          'expires_in',
          mockAuthToken.expires_in.toString()
        );
        done();
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
      });

      req.flush(mockAuthToken);
    });
    it('should set authorizationError if service fails', () => {
      spyOn(service, 'setAuthorizationError');
      const mockError = {
        error: 'invalid_grant',
        error_description: 'Invalid authorization code',
      };

      service.authorize$('ABC123').subscribe({
        next: () => fail('should have failed with the 400 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(400);
          expect(service.setAuthorizationError).toHaveBeenCalledWith({
            status: 400,
            error: mockError.error,
            error_description: mockError.error_description,
          });
        },
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
      });

      req.flush(mockError, { status: 400, statusText: 'Test error' });
    });
  });
});
