import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'app/services/document/document.service';

@Component({
  selector: 'app-consulter-rapport',
  templateUrl: './consulter-rapport.component.html',
  styleUrls: ['./consulter-rapport.component.scss']
})
export class ConsulterRapportComponent implements OnInit {

  id
  rapport: any;
  bilan: any;
  etat: any;
  total_n_passif = 0;
  total_passif = 0;
  total_n_actifs = 0;
  total_actifs = 0;
  total_capitaux = 0;


  total_exploit=0;
  total_charges_exploit=0;
  result_av_impot=0;
  result_av_net=0;
  result_apr_mod=0;


  ratio_auto_fin=0;//capitaux propres/total_bilan
  // this.ratio_auto_fin=this.total_capitaux/(this.total_actifs+this.total_n_actifs+this.total_n_passif+this.total_passif+this.total_capitaux)   //capitaux propres/total_bilan
  
  ///??????????????????????????????///???????//??????????????
  ratio_endettement_net=0;//endettement net/capitaux propres
  //endettement net=dettes bancaire (court,moyen,long)+comptes courants associées-disponibilité-valeurs mobiliéres de placement
  ratio_liquidite_gen=0; //actif_circulant/passif_circulant
  //actif_circulant=stocks+créances clients
  ratio_couverture_emploi_stable=0;//capitaux_permanents/actif_immobilisé
  //capitaux_permanents=fond_propres/provisions pour risques et charges + dettes moyen et long terme
  //actif_immo_brut=immo_corp+immo_incorp+immo_fin
  //OU
  //actif_immo_net=actif_immo_brut-amortissement corp et incorp-depreciation des immo
  ratio_vetuste=0;//immo_corp_nettes/immo_corp_brutes
  frng=0;//capitaux_permanents-actif_immo
  bfr=0;//actif_circulant-passif_circulant
  tn=0;//frng-bfr
  //???????????????????????????//???????????????????????????

  constructor(private activatedRoute: ActivatedRoute,
    private documentService: DocumentService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.documentService.getRapportById(this.id).subscribe(res => {
        if (res.success) {
          this.rapport = res.obj;
          this.bilan = this.rapport.bilan;
          this.etat = this.rapport.etat;
          console.log(this.bilan)
          console.log(this.etat)
          this.calcBilan();
          this.total_n_actifs = (this.bilan.actifs_n_courants.immo_incorp) + (this.bilan.actifs_n_courants.immo_corp) + (this.bilan.actifs_n_courants.immo_fin) + this.bilan.actifs_n_courants.autres_actifs_non_courants;
          this.total_actifs = (this.bilan.actifs_courants.stocks) + (this.bilan.actifs_courants.clients_comptes_rattache) + this.bilan.actifs_courants.autres_actifs_courants + this.bilan.actifs_courants.placements_autres_actifs_fin + this.bilan.actifs_courants.liquidite_equiv_liquidite;
          this.total_capitaux = this.bilan.capitaux_propres.capital_social + this.bilan.capitaux_propres.reserves + this.bilan.capitaux_propres.autres_capitaux_propres + this.bilan.capitaux_propres.resultats_reportees;
          this.total_n_passif = this.bilan.passifs_non_courants.emprunts + this.bilan.passifs_non_courants.autres_passif_fin + this.bilan.passifs_non_courants.provisions;
          this.total_passif = this.bilan.passifs_courants.fournisseurs_comptes_rattache + this.bilan.passifs_courants.autres_passifs_courants + this.bilan.passifs_courants.concours_bancaire_autres_passifs_fin;
         
          this.total_exploit=this.etat.produits_exploitation.prod_exploits+this.etat.produits_exploitation.prod_immo;
          this.total_charges_exploit=this.etat.charges_exploitation.var_stocks_prod_finis_encours+this.etat.charges_exploitation.achats_marchandises_consom+this.etat.charges_exploitation.achats_approvisionnements_consom+this.etat.charges_exploitation.charges_personnel+this.etat.charges_exploitation.dot_amor_prov+this.etat.charges_exploitation.autres_charges_exploit;
          this.result_av_impot=this.etat.resultats_exploitation.charges_fin_net+this.etat.resultats_exploitation.prod_placements+this.etat.resultats_exploitation.autres_gains_ordi+this.etat.resultats_exploitation.autres_pertes_ordi;
          this.result_av_net=this.result_av_impot+this.etat.impot_benefice+this.etat.elem_extra;
          this.result_apr_mod=this.total_exploit+this.total_charges_exploit+this.result_av_net+this.etat.effet_modif_compta;
        }
      })
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



