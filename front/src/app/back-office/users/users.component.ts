import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralDataSource } from 'app/services/general';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from 'app/services/general.service';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  exporting = false;
  public focus;
  displayedColumns: string[] = ['email','createdAt', 'action'];
  dataSource: GeneralDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
 
  closeResult: string;
  error: string;
  length: Number = 0;
  activeSortHeader = [];
  valueSortHeader = [];
  query:any={isAdmin:true}
  constructor(private userService: UserService, private modalService: NgbModal, private snackBar: MatSnackBar,
    private generalService: GeneralService,private router:Router) { }
 
  ngOnInit(): void {
 
    this.generalService.getCount('user').subscribe(res => {
      this.length = res;
    }, err => {
    })
  
    this.dataSource = new GeneralDataSource(this.generalService);
    this.dataSource.loadItems(0, 5, this.activeSortHeader, this.valueSortHeader, "", 'user',this.query);
 
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
    this.dataSource.loadItems(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize, this.activeSortHeader, this.valueSortHeader, this.input.nativeElement.value, 'user',this.query)
  }

}
