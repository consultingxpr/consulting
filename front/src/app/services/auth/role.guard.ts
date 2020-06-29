import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import * as decode from 'jwt-decode';
import { UserService } from '../user/user.service';
// tslint:disable-next-line:label-position

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router,private userService:UserService) {}
  canActivate(Route: ActivatedRouteSnapshot): boolean {
      return true;
    }


}