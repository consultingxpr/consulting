import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DocumentService } from 'app/services/document/document.service';
import { GeneralService } from 'app/services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rapportsLength=0;
  clientsLength=0;

  lastRapports:any;
  now:Date=new Date()
  constructor(private documentService:DocumentService,private generalService:GeneralService) { }
  
  ngOnInit() {
    this.documentService.getTodayRapports().subscribe(res=>{
      console.log(res)
      if(res.success)
      {
        console.log(res)
         this.lastRapports=res.obj;
      }else{

      }
    })
    this.generalService.getCount('rapport').subscribe(res=>{
      this.rapportsLength=res;
    })
    this.generalService.getCount('user').subscribe(res=>{
      this.clientsLength=res;
    })
  }

}
