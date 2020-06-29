import {Injectable} from '@angular/core'; 
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(private authservice: AuthService,
        private router: Router) {
    }

    canActivate(){
        const tokenPayload: any = this.authservice.getUserfromToken();
        
        if(this.authservice.loggedIn()){
           if (!tokenPayload.isAdmin) {
            return true ;
        } else{
            this.router.navigate(['/admin/dashboard']);
            return false ;
        }

    } else {
        this.router.navigate(['/login']);
        return false ;
    }
    }

}