import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RbacService } from '../services/rbac.service';
import { Roles } from '../../app/models/roles.enum';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const service=inject(AuthService);
  const router = inject(Router);
  const rbac=inject(RbacService);
  if (!service.isAuthenticated()) {
    router.navigate([`login`]);
    return false;
  }
  if(rbac.isGranted(Roles.ROLE_BANNED)){
    router.navigate([`**`]);
    return false;
  }
  if(!rbac.isGranted(Roles.ROLE_ADMIN)){
    router.navigate([``]);
    return false;
  }

  return rbac.isGranted(Roles.ROLE_ADMIN);

};
