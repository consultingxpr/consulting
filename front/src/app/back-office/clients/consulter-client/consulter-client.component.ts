import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DocumentService } from 'app/services/document/document.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user/user.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { environment } from 'environments/environment';
import states from '../../../../states.json';
import countries from '../../../../countries.json';
import cities from '../../../../cities.json';
import { GeneralService } from 'app/services/general.service.js';
import { GeneralDataSource } from 'app/services/general.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-consulter-client',
  templateUrl: './consulter-client.component.html',
  styleUrls: ['./consulter-client.component.scss']
})
export class ConsulterClientComponent implements OnInit {

  id
  user:any;



  //etats
  states = states.states;
  //pays
  countries = countries.countries;
  // ville
  cities = cities.cities;


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
  email: any;
  password: any;


  baseUrlImage = environment.baseUrl;
  imageSrc: string = "/uploads/logo-placeholder.png";
  previewURL: any = this.baseUrlImage + this.imageSrc;

  isDocument:boolean=false;




  exporting = false;
  public focus;
  displayedColumns: string[] = ['num','createdAt', 'action'];
  dataSource: GeneralDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
 
  closeResult: string;
  error: string;
  documentsLength: Number = 0;
  activeSortHeader = [];
  valueSortHeader = [];
  isBilan=true;
  isBalance=false;
  chosenEntity="bilan"
  activeEntity=1
  query:any={creatorId:""}
  constructor(private documentService:DocumentService,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private _formBuilder:FormBuilder,
    private generalService:GeneralService,
    private snackBar: MatSnackBar) { 
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
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.id=params["id"]
      switch(Number(params["type"]))
      {
        case 1:
          this.isDocument=false;
          //client
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
            this.imageSrc = this.user.sigle
            this.previewURL = this.baseUrlImage + this.imageSrc;
          })
          break;
        case 2:
          this.isDocument=true;
          this.query.creatorId=this.id;
          this.userService.getOneUser(this.id).subscribe(res => {
            this.user = res;
          })
          this.generalService.getCountWithId(this.chosenEntity,this.id).subscribe(res => {
            this.documentsLength = res;
          }, err => {
          })
        
          this.dataSource = new GeneralDataSource(this.generalService);
          this.dataSource.loadItems(0, 5, this.activeSortHeader, this.valueSortHeader, "", this.chosenEntity, this.query);
        //documents
          break;  
      }
    })
  }



  onUpdateUserSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      this.user = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
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


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDocumentPage();
        })
      )
      .subscribe();
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadDocumentPage())
      )
      .subscribe();
    this.paginator.page
      .pipe(
        tap(() => this.loadDocumentPage())
      )
      .subscribe();
  }
  loadDocumentPage() {
    if (this.sort.active) {
      let x = this.activeSortHeader.filter(x => x === this.sort.active);
      if (!x || x.length == 0) {
        this.activeSortHeader.push(this.sort.active);
        if (this.sort.direction === "asc") {
          this.valueSortHeader.push(1)
        } else {
          this.valueSortHeader.push(-1);
        }
      } else {
        let index = this.activeSortHeader.indexOf(this.sort.active);
        if (this.sort.direction === "asc") {
          this.valueSortHeader[index] = 1;
        } else {
          this.valueSortHeader[index] = -1;
        }
 
      }
    }
    this.dataSource.loadItems(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize, this.activeSortHeader, this.valueSortHeader, this.input.nativeElement.value, this.chosenEntity, this.query)
  }
 
  filtre()
  {
    switch(Number(this.activeEntity))
    {
      case 1:
       this.chosenEntity="bilan";
       this.isBilan=true;
       this.isBalance=false;
        break;
      case 2:
       this.chosenEntity="etatderesultat";
       this.isBilan=false;
       this.isBalance=false;
        break;
      case 3:
       this.chosenEntity="balance";
       this.isBilan=false;
       this.isBalance=true;
        break;    
    }
   this.ngOnInit();
  }
}
