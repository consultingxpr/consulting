import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'app/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/services/auth/auth.service';
import { FormulaireService } from 'app/services/formulaire/formulaire.service';
import { GeneralService } from 'app/services/general.service';
import { passValidation } from 'app/services/validations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  


  id;
  fourthFormGroup: FormGroup;
  hide = true;
  user:any;


  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formulaireService: FormulaireService,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute) {
      this.fourthFormGroup=this._formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: ['', Validators.required],
        confirmermotdepasse: new FormControl('', [passValidation])
        
      });
      this.fourthFormGroup.controls.password.valueChanges.subscribe(
        x => this.fourthFormGroup.controls.confirmermotdepasse.updateValueAndValidity()
      )
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.userService.getOneUser(this.id).subscribe(res => {
        this.user = res;
        this.fourthFormGroup.patchValue({
          email: this.user.email,
          password:""
        })
      })
    })
  }

  onUpdateUserSubmit() {
   
  }




  

}
