import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(code: string): Observable<boolean> {
    return this.authorizationService.authorize$(code).pipe(
      map((authToken) => {
        return !!authToken;
      }),
      catchError(() => {
        return this.router.navigateByUrl('/error');
      })
    );
  }
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuardService).canActivate(route?.queryParams['code']);
};
