import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { passValidation } from 'app/services/validations';
import {UserService} from '../services/user/user.service'
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';
import states from '../../states.json';
import countries from '../../countries.json';
import cities from '../../cities.json';
import { FormulaireService } from 'app/services/formulaire/formulaire.service';
import { AuthService } from 'app/services/auth/auth.service';
import { environment } from 'environments/environment';
import { GeneralService } from 'app/services/general.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
//etats
  states = states.states;
//pays
  countries = countries.countries;
  // ville
  cities = cities.cities;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  fourthFormGroup:FormGroup;
  thirdFormGroup: FormGroup;
  userForm: FormGroup;
  formSubmitAttemptFirst:boolean=false;
  formSubmitAttemptSec:boolean=false;
  formSubmitAttemptThird:boolean=false;
  formSubmitAttemptFourth:boolean=false;
  hide=true;
  
  formejuridiques: string[] = [
    'Entreprise individuelle', 'Société à responsabilité limitée (SARL)', 'Société unipersonnelle à responsabilité limitée (SUARL)',
    'Société anonyme (SA)','Société en commandite par actions (SCA)'
  ];
  secteurs: string[] = [
    'Les industries manufacturières', 'Services informatiques', 'Les communications',
    'Transport', 'Education et enseignement', 'Santé','Activités de production et d’industries culturelles',
    'Animation des jeunes les loisirs l\'encadrement de l\'enfance et la protection des personnes âgées',
    'Protection de l\'environnement','Formation professionnelle','Travaux publics','Promotion immobilière',
    'Services d\'études, de conseils, d\'expertises et d\'assistance','Services de recherche- développement',
    'Autres services',

  ];
  
  formSubmitAttempt: boolean=false;
  formSuccess: boolean
  user: any;
  email: any;
  password: any;


  baseUrlImage=environment.baseUrl;
  imageSrc:string="/uploads/logo-placeholder.png";
  previewURL:any=this.baseUrlImage+this.imageSrc;

  constructor(private _formBuilder: FormBuilder,  
      private userService: UserService,
      private router :Router,
      private snackBar: MatSnackBar,
      private authService:AuthService,
      private formulaireService:FormulaireService,
      private generalService:GeneralService

    ) {
    this.firstFormGroup = this._formBuilder.group({
      raisonsocial: ['', Validators.required],
      formejuridique: ['', Validators.required],
      secteur: ['', Validators.required],
      autresecteur: [''],
      Date: ['', Validators.required],
      matriculefiscal:new FormControl ('', [Validators.required])
    });
    this.secondFormGroup = this._formBuilder.group({
      tel: new FormControl('', [Validators.required, Validators.min(10000000), Validators.max(90000000)]),
      fax: '',
      representant: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      adresse: ['', Validators.required],
      codepostal: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      ville: ['', Validators.required],
      etat: ['', Validators.required],
      pays: ['', Validators.required]
    });
    this.fourthFormGroup=this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: ['', Validators.required],
      confirmermotdepasse: new FormControl('', [passValidation])
      
    });
    this.fourthFormGroup.controls.password.valueChanges.subscribe(
      x => this.fourthFormGroup.controls.confirmermotdepasse.updateValueAndValidity()
    )
  }
  
  onSubmit() {

    this.formSubmitAttempt = true;
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup) {
      this.user = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        ...this.fourthFormGroup.value,
        isAdmin:false,
        sigle: this.imageSrc
      };
      this.userService.createUser(this.user).subscribe(res=>{
        if(res.success)
        {
          this.formSuccess=true;
          this.snackBar.open(res.msg, '✔', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['btn-success']
          });
          this.authService.authenticateUser(this.fourthFormGroup.value).subscribe(data =>{
            if(data.success){
               this.authService.sotreUserData(data.token, data.user);
               this.router.navigate(['/client/formulaire/ajouter-formulaire']);
            } else{
             
                
            }
           
           });
        }else{
          this.formSuccess =false;
          this.snackBar.open(res.msg, 'x', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['btn-danger']
          });
        }
      })  
    }
  }

  fn(){
    if(this.firstFormGroup.controls.secteur.value == 'Autres services'){
      this.firstFormGroup.controls["autresecteur"].setValidators([Validators.required]);
    } else {
      this.firstFormGroup.controls["autresecteur"].clearValidators()
    }
    this.firstFormGroup.controls["autresecteur"].updateValueAndValidity();
  }

  ngOnInit() {
  }


  submitAttempt(index) {
    switch (Number(index)) {
      case 1:
        this.formSubmitAttemptFirst=true;
        break;
      case 2:
        this.formSubmitAttemptSec=true;
        break;
      case 3:
        this.formSubmitAttemptThird=true;
        break;
      case 4:
        this.formSubmitAttemptFourth=true;
        break;   
    }

  }

  addImage(imageInputPic: any) {
    const file: File = imageInputPic.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.previewURL = reader.result;
      this.generalService.uploadImage(file).subscribe(
        (res) => {
          if (res.success) {
            /*this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                type:'alert-success',
                text:'Image a été téléchargée avec succès'},
              duration: 3000
            });*/
            this.imageSrc = res.name;
          } else {
           /* this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                type:'alert-danger',
                text:'Problème lors du téléchargement de l image'},
              duration: 3000
            });*/
          }
        },
        (err) => {

        })
    });
    if (imageInputPic.files[0]) {
      reader.readAsDataURL(imageInputPic.files[0]);
    }

  }

}



