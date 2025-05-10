import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { RbacService } from '../services/rbac.service';
import { Roles } from '../../app/models/roles.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service=inject(AuthService);
  const rbac=inject(RbacService);
  if (!service.isAuthenticated()) {
    router.navigate([`login`]);
    return false;
  }
  if(rbac.isGranted(Roles.ROLE_BANNED)){
    router.navigate([`**`]);
    return false;
  }
  return true;
};
