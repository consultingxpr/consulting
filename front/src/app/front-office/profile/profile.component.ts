import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { UserService } from 'app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import states from '../../../states.json';
import countries from '../../../countries.json';
import cities from '../../../cities.json';
import { GeneralService } from 'app/services/general.service.js';
import { passValidation } from 'app/services/validations.js';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //etats
  states = states.states;
  //pays
  countries = countries.countries;
  // ville
  cities = cities.cities;

  id;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  userForm: FormGroup;
  formSubmitAttemptFirst: boolean = false;
  formSubmitAttemptSec: boolean = false;
  formSubmitAttemptThird: boolean = false;
  formSubmitAttemptFourth: boolean = false;
  hide = true;

  formejuridiques: string[] = [
    'Entreprise individuelle', 'Société à responsabilité limitée (SARL)', 'Société unipersonnelle à responsabilité limitée (SUARL)',
    'Société anonyme (SA)', 'Société en commandite par actions (SCA)'
  ];
  secteurs: string[] = [
    'Les industries manufacturières', 'Services informatiques', 'Les communications',
    'Transport', 'Education et enseignement', 'Santé', 'Activités de production et d’industries culturelles',
    'Animation des jeunes les loisirs l\'encadrement de l\'enfance et la protection des personnes âgées',
    'Protection de l\'environnement', 'Formation professionnelle', 'Travaux publics', 'Promotion immobilière',
    'Services d\'études, de conseils, d\'expertises et d\'assistance', 'Services de recherche- développement',
    'Autres services',

  ];

  formSubmitAttempt: boolean = false;
  formSuccess: boolean
  user: any;
  email: any;
  password: any;


  baseUrlImage = environment.baseUrl;
  imageSrc: string = "/uploads/logo-placeholder.png";
  previewURL: any = this.baseUrlImage + this.imageSrc;


  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private generalService:GeneralService) {
    this.firstFormGroup = this._formBuilder.group({
      raisonsocial: ['', Validators.required],
      formejuridique: ['', Validators.required],
      secteur: ['', Validators.required],
      autresecteur: [''],
      Date: ['', Validators.required],
      matriculefiscal: new FormControl('', [Validators.required])
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

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.userService.getOneUser(this.id).subscribe(res => {
        this.user = res;
        this.firstFormGroup.patchValue({
          raisonsocial: this.user.raisonsocial,
          formejuridique: this.user.formejuridique,
          secteur: this.user.secteur,
          autresecteur: this.user.autresecteur,
          Date: this.user.Date,
          matriculefiscal: this.user.matriculefiscal
        })
        this.secondFormGroup.patchValue({
          tel: this.user.tel,
          fax: this.user.fax,
          representant: this.user.representant
        })
        this.thirdFormGroup.patchValue({
          adresse: this.user.adresse,
          codepostal: this.user.codepostal,
          ville: this.user.ville,
          etat: this.user.etat,
          pays: this.user.pays
        })
        this.fourthFormGroup.patchValue({
          email:this.user.email
        })
        this.imageSrc = this.user.sigle
        this.previewURL = this.baseUrlImage + this.imageSrc;
      })
    })
  }

  onUpdateUserSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid) {
      this.user = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        ...this.fourthFormGroup.value,
        sigle: this.imageSrc
      };
      this.userService.updateUser(this.id, this.user).subscribe(res => {
        if (res.success) {
          this.snackBar.open(res.msg, '✔', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['btn-success']
          });
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


  addImage(imageInputPic: any) {
    const file: File = imageInputPic.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.previewURL = reader.result;
      this.generalService.uploadImage(file).subscribe(
        (res) => {
          if (res.success) {
            this.imageSrc = res.name;
          } else {

          }
        },
        (err) => {

        })
    });
    if (imageInputPic.files[0]) {
      reader.readAsDataURL(imageInputPic.files[0]);
    }

  }


  fn() {
    if (this.firstFormGroup.controls.secteur.value == 'Autres services') {
      this.firstFormGroup.controls["autresecteur"].setValidators([Validators.required]);
    } else {
      this.firstFormGroup.controls["autresecteur"].clearValidators()
    }
    this.firstFormGroup.controls["autresecteur"].updateValueAndValidity();
  }

}
