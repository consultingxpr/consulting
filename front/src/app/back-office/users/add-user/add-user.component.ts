import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { passValidation } from 'app/services/validations';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  id
  user: any;
  firstFormGroup: FormGroup;
  hide = true;
  constructor(private userService: UserService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.firstFormGroup = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: ['', Validators.required],
      confirmermotdepasse: new FormControl('', [passValidation])

    });
    this.firstFormGroup.controls.password.valueChanges.subscribe(
      x => this.firstFormGroup.controls.confirmermotdepasse.updateValueAndValidity()
    )
  }

  ngOnInit(): void {

  }

  addUser() {
    if (this.firstFormGroup.valid) {
      this.user = {
        ...this.firstFormGroup.value,
        isAdmin: true
      };
      this.userService.createUser(this.user).subscribe(res => {
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

}
