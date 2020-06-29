import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user/user.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { passValidation } from 'app/services/validations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  id
  user:any;
  firstFormGroup: FormGroup;
  hide=true;
  constructor(private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private _formBuilder:FormBuilder,
    private snackBar: MatSnackBar,
    private router:Router) {
    this.firstFormGroup=this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: ['', Validators.required],
      confirmermotdepasse: new FormControl('', [passValidation])
      
    });
    this.firstFormGroup.controls.password.valueChanges.subscribe(
      x => this.firstFormGroup.controls.confirmermotdepasse.updateValueAndValidity()
    )
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.id=params["id"];
      this.userService.getOneUser(this.id).subscribe(res=>{
        this.user=res;
        this.firstFormGroup.patchValue({
          email:this.user.email
        })
      })
    })
  }

  updateUser(){
    this.userService.updateUser(this.id,this.user).subscribe(res=>{
      if (res.success) {
        this.snackBar.open(res.msg, '✔', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['btn-success']
        });
        this.router.navigate(['/admin/users'])
      } else {
        this.snackBar.open(res.msg, 'X', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['btn-danger']
        });
      }
    })
  }

}
