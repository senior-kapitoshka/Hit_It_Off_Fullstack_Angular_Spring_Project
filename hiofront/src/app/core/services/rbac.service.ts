import { Injectable } from '@angular/core';
import { User } from '../../app/models/user.interface';
import { Roles } from '../../app/models/roles.enum';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  private roles = new Set(['ROLE_USER','ROLE_ADMIN','ROLE_BANNED','ROLE_MUTED']);
  private authenticatedRole!: Roles|string;
  constructor(private _cookieService:CookieService){

  }

  setAuthenticatedUser(role: Roles|string) {
    this.authenticatedRole = role;

  }


 isGranted(roleOrPermission: string, role?: Roles|string): boolean {

  if (!role) {
    role = this.authenticatedRole?this.authenticatedRole
    :this._cookieService.get("role");
  }
  if (!role) {
    return false;
  }
  return this.roles.has(role) && role===roleOrPermission;
}

}

