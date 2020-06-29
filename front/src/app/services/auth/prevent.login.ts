import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class PreventLogin implements CanActivate {

    constructor(private authservice: AuthService, private router: Router) { }

    canActivate() {
        if (!this.authservice.loggedIn()) {
            return true;
        } else {
            const tokenPayload: any = this.authservice.getUserfromToken();
            if (!tokenPayload.isAdmin) {
                this.router.navigate(['/client/dashboard']);
                return false;
            } else {
                this.router.navigate(['/admin/dashboard']);
                return false;
            }

        }
    }
} 