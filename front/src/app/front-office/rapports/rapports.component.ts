import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralDataSource } from 'app/services/general';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'environments/environment';
import { UserService } from 'app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from 'app/services/general.service';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.scss']
})
export class RapportsComponent implements OnInit {
  /**
 num,done,confirmed,canceled,enAttente,demande,creatorId,note,date_maximale,
     matieres: [{
         matiere_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere', required: true },
         asked_quantite: { type: Number, required: true }
     }],
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
  */

 exporting = false;
 public focus;
 displayedColumns: string[] = ['num', 'createdAt', 'action'];
 dataSource: GeneralDataSource;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild('input') input: ElementRef;

 closeResult: string;
 error: string;
 rapportsLength: Number = 0;
 activeSortHeader = [];
 valueSortHeader = [];
 query:any={creatorId:""}
 constructor(private generalService: GeneralService,private authService:AuthService) { }

 ngOnInit(): void {
  this.query.creatorId=this.authService.getIdfromToken();
   this.generalService.getCountWithId('rapport',this.authService.getIdfromToken()).subscribe(res => {
    this.rapportsLength = res;
  }, err => {
  })
 
   this.dataSource = new GeneralDataSource(this.generalService);
   this.dataSource.loadItems(0, 5, this.activeSortHeader, this.valueSortHeader, "", 'rapport',this.query);

 }

 ngAfterViewInit(): void {
   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
   fromEvent(this.input.nativeElement, 'keyup')
     .pipe(
       debounceTime(150),
       distinctUntilChanged(),
       tap(() => {
         this.paginator.pageIndex = 0;
         this.loadRapportPage();
       })
     )
     .subscribe();
   merge(this.sort.sortChange, this.paginator.page)
     .pipe(
       tap(() => this.loadRapportPage())
     )
     .subscribe();
   this.paginator.page
     .pipe(
       tap(() => this.loadRapportPage())
     )
     .subscribe();
 }
 loadRapportPage() {
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
   this.dataSource.loadItems(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize, this.activeSortHeader, this.valueSortHeader, this.input.nativeElement.value, 'rapport',this.query)
 }










}
