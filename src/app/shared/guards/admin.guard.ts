import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).isAdmin();
};
