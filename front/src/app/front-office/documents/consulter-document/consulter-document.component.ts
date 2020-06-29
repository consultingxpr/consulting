import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'app/services/document/document.service';

@Component({
  selector: 'app-consulter-document',
  templateUrl: './consulter-document.component.html',
  styleUrls: ['./consulter-document.component.scss']
})
export class ConsulterDocumentComponent implements OnInit {

  bilan: any;
  etat: any;
  balance:any;
  isBilan: boolean = false;
  isBalance:boolean=false;
   
  total_n_passif = 0;
  total_passif = 0;
  total_n_actifs = 0;
  total_actifs = 0;
  total_capitaux = 0;


  total_exploit = 0;
  total_charges_exploit = 0;
  result_av_impot = 0;
  result_av_net = 0;
  result_apr_mod = 0;
  constructor(private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      switch (Number(params["type"])) {
        case 1:
        this.isBalance=false;
          this.documentService.getBilanById(params["id"]).subscribe(res => {
            if (res.success) {
              this.isBilan=true;
              this.bilan = res.obj;
              console.log(res.obj)
              this.calcBilan();
              this.total_n_actifs = (this.bilan.actifs_n_courants.immo_incorp) + (this.bilan.actifs_n_courants.immo_corp) + (this.bilan.actifs_n_courants.immo_fin) + this.bilan.actifs_n_courants.autres_actifs_non_courants;
              this.total_actifs = (this.bilan.actifs_courants.stocks) + (this.bilan.actifs_courants.clients_comptes_rattache) + this.bilan.actifs_courants.autres_actifs_courants + this.bilan.actifs_courants.placements_autres_actifs_fin + this.bilan.actifs_courants.liquidite_equiv_liquidite;
              this.total_capitaux = this.bilan.capitaux_propres.capital_social + this.bilan.capitaux_propres.reserves + this.bilan.capitaux_propres.autres_capitaux_propres + this.bilan.capitaux_propres.resultats_reportees;
              this.total_n_passif = this.bilan.passifs_non_courants.emprunts + this.bilan.passifs_non_courants.autres_passif_fin + this.bilan.passifs_non_courants.provisions;
              this.total_passif = this.bilan.passifs_courants.fournisseurs_comptes_rattache + this.bilan.passifs_courants.autres_passifs_courants + this.bilan.passifs_courants.concours_bancaire_autres_passifs_fin;
            } else {

            }
          })
          break;
        case 2:
          this.isBalance=false;
          this.isBilan=false;
          this.documentService.getEtatById(params["id"]).subscribe(res => {
            if (res.success) {

              this.total_exploit=this.etat.produits_exploitation.prod_exploits+this.etat.produits_exploitation.prod_immo;
              this.total_charges_exploit=this.etat.charges_exploitation.var_stocks_prod_finis_encours+this.etat.charges_exploitation.achats_marchandises_consom+this.etat.charges_exploitation.achats_approvisionnements_consom+this.etat.charges_exploitation.charges_personnel+this.etat.charges_exploitation.dot_amor_prov+this.etat.charges_exploitation.autres_charges_exploit;
              this.result_av_impot=this.etat.resultats_exploitation.charges_fin_net+this.etat.resultats_exploitation.prod_placements+this.etat.resultats_exploitation.autres_gains_ordi+this.etat.resultats_exploitation.autres_pertes_ordi;
              this.result_av_net=this.result_av_impot+this.etat.impot_benefice+this.etat.elem_extra;
              this.result_apr_mod=this.total_exploit+this.total_charges_exploit+this.result_av_net+this.etat.effet_modif_compta;
            } else {

            }
          })
          break;
          case 3:
            this.isBilan=false;
            
            this.documentService.getBalnceById(params["id"]).subscribe(res=>{
              if(res.success)
              {
                this.isBalance=true;
                this.balance=res.obj
              }else{

              }
            })
            break;
      }
    })
  }

  calcBilan() {
    this.bilan.actifs_n_courants.immo_corp=this.getValue(this.bilan.actifs_n_courants.immo_corp,this.bilan.actifs_n_courants.amortissement);
    this.bilan.actifs_n_courants.immo_incorp = this.getValue(this.bilan.actifs_n_courants.immo_incorp,this.bilan.actifs_n_courants.amortissement);
    this.bilan.actifs_n_courants.immo_fin=this.getValue(this.bilan.actifs_n_courants.immo_fin,this.bilan.actifs_n_courants.provisions);
    this.bilan.actifs_courants.stocks=this.getValue(this.bilan.actifs_courants.stocks,this.bilan.actifs_n_courants.provisions);
    this.bilan.actifs_courants.clients_comptes_rattache=this.getValue(this.bilan.actifs_courants.clients_comptes_rattache,this.bilan.actifs_n_courants.provisions);
  }

  getValue(x, y) {
    if (x != 0) {
      return x - y
    } else {
      return 0
    }
  }
}
