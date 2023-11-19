import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RedirectGuardService {
  canActivate(externalUrl: string): boolean {
    window.location.href = externalUrl;
    return true;
  }
}

export const redirectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(RedirectGuardService).canActivate(route.data['externalUrl']);
};
