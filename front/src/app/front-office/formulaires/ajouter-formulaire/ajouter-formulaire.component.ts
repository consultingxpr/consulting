import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UserService } from 'app/services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { passValidation } from 'app/services/validations';
import { AuthService } from 'app/services/auth/auth.service';
import { FormulaireService } from 'app/services/formulaire/formulaire.service';
@Component({
  selector: 'app-ajouter-formulaire',
  templateUrl: './ajouter-formulaire.component.html',
  styleUrls: ['./ajouter-formulaire.component.scss']
})
export class AjouterFormulaireComponent implements OnInit {


  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;



  investissement: any[] = [
    { description: "Fonds Propres", value: "fondspropres" },
    { description: "Crédit Bancaires", value: "creditbancaire" },
    { description: "Crédit Leasing", value: "creditleasing" },
    { description: "Autres", value: "Autres" },
  ]

  transport: any[] = [
    { description: "Fonds Propres", value: "fondspropres2" },
    { description: "Crédit Bancaires", value: "creditbancaire2" },
    { description: "Crédit Leasing", value: "creditleasing2" },
    { description: "Autres", value: "Autres2" },
  ]
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
  formSubmitAttemptFirst: boolean = false;
  formSubmitAttemptSec: boolean = false;
  formSubmitAttemptThird: boolean = false;
  formSuccess: boolean
  formulaire: any;




  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formulaireService: FormulaireService
  ) {
    this.firstFormGroup = this._formBuilder.group({

      strategie: ['', Validators.required],
      investissement: ['', Validators.required],
      manuel: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({

      bailleur: ['', Validators.required],
      servicebanque: ['', Validators.required],
      changerbanque: [''],
      tauxinteret: '',
      coutemprunt: ['', Validators.required],
      financerinvestissement: new FormArray([], [Validators.required]),
      courtiers: ['', Validators.required],
      materieltransport: new FormArray([], [Validators.required]),
      assurance: ['', Validators.required],
      etudefiancieres: ['', Validators.required]

    });

    this.thirdFormGroup = this._formBuilder.group({
      strategierh: ['', Validators.required],
      expertsrh: ['', Validators.required],
      strategierecrutement: ['', Validators.required],
      expertsrecrutement: ['', Validators.required],
      solutioncomptable: ['', Validators.required]
    });
  }

  onSubmit() {

    this.formSubmitAttempt = true;
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      this.formulaire = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        creatorId: this.authService.getIdfromToken()
      };
      this.formulaireService.createFormulaire(this.formulaire).subscribe(res => {
        if (res.success) {
          this.formSuccess = true;
          this.snackBar.open(res.msg, '✔', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['btn-success']
          });
          this.router.navigate(['/client/ajouter-rapport'])
        } else {
          this.formSuccess = false;
          this.snackBar.open(res.msg, 'x', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['btn-danger']
          });
        }
      })
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

  ngOnInit() {
    this.formulaireService.getByUser(this.authService.getIdfromToken()).subscribe(res=>{
      if(res.success)
      {
       if(res.obj && res.obj.length>0)
       {
         this.router.navigate(['/client/formulaire/consulter-formulaire']);
       }
      }else{

      }
    })
  }

  onCheckChange(event) {
    const formArray: FormArray = this.secondFormGroup.get('financerinvestissement') as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }


  }

  onCheckChange2(event) {
    const formArray: FormArray = this.secondFormGroup.get('materieltransport') as FormArray;

    /* Selected */console.log(event)
    console.log(event.target)
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }


  }
  submitAttempt(index) {
    console.log(this.findInvalidControls())
    this.formSubmitAttempt = true;
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
    }

  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.secondFormGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
