import { Component, OnInit } from '@angular/core';
import { FormulaireService } from 'app/services/formulaire/formulaire.service';
import { AuthService } from 'app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulter-formulaire',
  templateUrl: './consulter-formulaire.component.html',
  styleUrls: ['./consulter-formulaire.component.scss']
})
export class ConsulterFormulaireComponent implements OnInit {

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
  formId:any;
  constructor(private formulaireService: FormulaireService,
    private authService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
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
      financerinvestissement: ['',Validators.required],
      courtiers: ['', Validators.required],
      materieltransport: ['',Validators.required],
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

  

  fn() {
    if (this.firstFormGroup.controls.secteur.value == 'Autres services') {
      this.firstFormGroup.controls["autresecteur"].setValidators([Validators.required]);
    } else {
      this.firstFormGroup.controls["autresecteur"].clearValidators()
    }
    this.firstFormGroup.controls["autresecteur"].updateValueAndValidity();
  }

  ngOnInit(): void {
    this.formulaireService.getByUser(this.authService.getIdfromToken()).subscribe(res => {
      if (res.success) {
        if (!res.obj || res.obj.length <= 0) {
          this.router.navigate(['/client/formulaire/ajouter-formulaire']);
        } else {
          //this.formId=res.obj[0]._id;
          console.log(res)
          this.formulaire = res.obj[res.obj.length-1];
          this.formId=res.obj[res.obj.length-1]._id;
          this.firstFormGroup.patchValue({
            strategie: this.formulaire.strategie,
            investissement: this.formulaire.investissement,
            manuel: this.formulaire.manuel
          });
          this.secondFormGroup.patchValue({
            bailleur: this.formulaire.bailleur,
            servicebanque: this.formulaire.servicebanque,
            changerbanque: this.formulaire.changerbanque,
            tauxinteret: this.formulaire.tauxinteret,
            coutemprunt: this.formulaire.coutemprunt,
            financerinvestissement: this.formulaire.financerinvestissement,
            courtiers: this.formulaire.courtiers,
            materieltransport: this.formulaire.materieltransport,
            assurance: this.formulaire.assurance,
            etudefiancieres: this.formulaire.etudefiancieres
          })
          this.thirdFormGroup.patchValue({
            strategierh: this.formulaire.strategierh,
            expertsrh: this.formulaire.expertsrh,
            strategierecrutement: this.formulaire.strategierecrutement,
            expertsrecrutement: this.formulaire.expertsrecrutement,
            solutioncomptable: this.formulaire.solutioncomptable
          })
        }
      } else {

      }
    })
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
      this.formulaireService.updateFormulaire(this.formulaire,this.formId).subscribe(res=>{
        if(res.success)
        {
          this.snackBar.open(res.msg, '✔', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['btn-success']
          });
          this.router.navigate(['/client/ajouter-rapport'])
        }else{
          this.snackBar.open(res.msg, 'x', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['btn-danger']
          });
        }
      })
    
    }
  }






  submitAttempt(index) {
    this.formSubmitAttempt = true;
    switch (Number(index)) {
      case 1:
        this.formSubmitAttemptFirst = true;
        break;
      case 2:
        this.formSubmitAttemptSec = true;
        break;
      case 3:
        this.formSubmitAttemptThird = true;
        break;
    }

  }


}
