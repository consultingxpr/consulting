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
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

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
 constructor(private userService: UserService, private modalService: NgbModal, private snackBar: MatSnackBar,
   private generalService: GeneralService,private router:Router,private authService:AuthService) { }

 ngOnInit(): void {
   this.query.creatorId=this.authService.getIdfromToken();
   this.generalService.getCountWithId(this.chosenEntity,this.authService.getIdfromToken()).subscribe(res => {
     this.documentsLength = res;
   }, err => {
   })
 
   this.dataSource = new GeneralDataSource(this.generalService);
   this.dataSource.loadItems(0, 5, this.activeSortHeader, this.valueSortHeader, "", this.chosenEntity, this.query);

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
