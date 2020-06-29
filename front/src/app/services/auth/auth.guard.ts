import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authservice: AuthService,
        private router: Router) {
    }

    canActivate() {
        const tokenPayload: any = this.authservice.getUserfromToken();
        console.log(tokenPayload)
        if (this.authservice.loggedIn()) {
            if (!tokenPayload.isAdmin) {
                this.router.navigate(['/client/dashboard']);
                return false;
            } else {
                return true;
            }

        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }


}