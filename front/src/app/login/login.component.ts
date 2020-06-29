import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router' ;
import { FormulaireService } from 'app/services/formulaire/formulaire.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email : string ;
  password : string ;
  error : string ;
  validation:string;
  loginIn = false;
  hide=true;

  constructor(
     private authService:AuthService,
     private router:Router,
     private formulaireService:FormulaireService
     ) { 

  }

  ngOnInit() {
  }

  onLoginSubmit(){
    this.loginIn = true;
    const user = {
      email : this.email,
      password : this.password
    }
      if(!this.email || !this.password){
        this.validation = 'Les champs email et mot de passe sont obligatoires';
        this.loginIn = false;
      } else {
      this.authService.authenticateUser(user).subscribe(data =>{
       if(data.success){
          this.authService.sotreUserData(data.token, data.user);
          if(this.authService.getUserType())
          {
            this.router.navigate(['/admin/dashboard']);
          }else{
            this.formulaireService.getByUser(this.authService.getIdfromToken()).subscribe(res=>{
              if(res.success)
              {
               if(res.obj && res.obj.length>0)
               {
                 this.router.navigate(['/client/dashboard']);
               }else{
                 this.router.navigate(['/client/formulaire/ajouter-formulaire']);
               }
              }else{

              }
            })
          }
       } else{
        
            this.error = data.msg ; 
       }
       this.loginIn = false;
      });
    }
  }

}
