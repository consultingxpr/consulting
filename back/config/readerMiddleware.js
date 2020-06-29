const excel = require('exceljs')
const fs = require('fs');
var path = require('path');
const Entity = require('./entity');

module.exports.readBilan = function (path, callback) {
    const workbook = new excel.Workbook();
    workbook.xlsx.readFile(path).then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row;
        let bilan = {
            num:"",
            actifs_n_courants: {
                immo_incorp: 0,//21
                immo_corp: 0,//22
                immo_fin: 0,//26
                autres_actifs_non_courants: 0,//27
                amortissement: 0,//28
                provisions: 0//29
            },
            actifs_courants: {
                stocks: 0,//37
                clients_comptes_rattache: 0,//41
                autres_actifs_courants: 0,//32
                placements_autres_actifs_fin: 0,//52
                liquidite_equiv_liquidite: 0,//50-59
            },
            capitaux_propres: {
                capital_social: 0,//101
                reserves: 0,//11
                autres_capitaux_propres: 0,//14
                resultats_reportees: 0//12
            },
            passifs_non_courants: {
                emprunts: 0,//16
                autres_passif_fin: 0,//18
                provisions: 0//15
            },
            passifs_courants: {
                fournisseurs_comptes_rattache: 0,//40
                autres_passifs_courants: 0,//4191,4196,4198,425,427,4286,432,4365,4368,437,45,472,48
                concours_bancaire_autres_passifs_fin: 0//56
            },
            emprunts_etab_credits: 0,//162
            emprunts_obligatoire: 0,//161
            comptes_courants_assoc_bloque: 0,//1642
            dettes_bancaire: 0,//1621
            dette_fin: 0,//50
            montant_avances_assoc: 0,//1642
            vmp: 0,
            date_bilan:"",
            creatorId: creatorId
        }
        worksheet.eachRow(function (filerow, rowNumber) {
            if (rowNumber > 2) {
                row = worksheet.getRow(rowNumber);
                switch (rowNumber) {
                    case 3:
                        bilan.actifs_n_courants.immo_incorp = Number(row.getCell(2).value);
                        bilan.actifs_n_courants.amortissement = Number(row.getCell(3).value)
                        break;
                    case 4:
                        bilan.actifs_n_courants.immo_corp = Number(row.getCell(2).value);
                        break;
                    case 5:
                        bilan.actifs_n_courants.immo_fin = Number(row.getCell(2).value);
                        bilan.actifs_n_courants.provisions = Number(row.getCell(3).value)
                        break;
                    case 6:
                        bilan.actifs_n_courants.autres_actifs_non_courants = Number(row.getCell(2).value);
                        break;
                    case 9:
                        bilan.actifs_courants.stocks = Number(row.getCell(2).value);
                        break;
                    case 10:
                        bilan.actifs_courants.clients_comptes_rattache = Number(row.getCell(2).value);
                        break;
                    case 11:
                        bilan.actifs_courants.placements_autres_actifs_fin = Number(row.getCell(2).value);
                        break;
                    case 12:
                        bilan.actifs_courants.liquidite_equiv_liquidite = Number(row.getCell(2).value);
                        break;
                    case 13:
                        bilan.actifs_courants.autres_actifs_courants = Number(row.getCell(2).value);
                        break;
                    case 16:
                        bilan.capitaux_propres.capital_social = Number(row.getCell(2).value);
                        break;
                    case 17:
                        bilan.capitaux_propres.reserves = Number(row.getCell(2).value);
                        break;
                    case 18:
                        bilan.capitaux_propres.autres_capitaux_propres = Number(row.getCell(2).value);
                        break;
                    case 19:
                        bilan.capitaux_propres.resultats_reportees = Number(row.getCell(2).value);
                        break;
                    case 22:
                        bilan.passifs_non_courants.emprunts = Number(row.getCell(2).value);
                        break;
                    case 23:
                        bilan.passifs_non_courants.autres_passif_fin = Number(row.getCell(2).value);
                        break;
                    case 24:
                        bilan.passifs_non_courants.provisions = Number(row.getCell(2).value);
                        break;
                    case 27:
                        bilan.passifs_courants.fournisseurs_comptes_rattache = Number(row.getCell(2).value);
                        break;
                    case 28:
                        bilan.passifs_courants.concours_bancaire_autres_passifs_fin = Number(row.getCell(2).value);
                        break;
                    case 29:
                        bilan.passifs_courants.autres_passifs_courants = Number(row.getCell(2).value);
                        break;

                }


            }
            console.log("each row"+ rowNumber)
        });
        console.log("mon bilan")
        console.log(bilan)
        
        callback({ success: true, obj: bilan })
    }).catch(err => {
        callback({ success: false, obj: err })
    });
}

module.exports.readEtat = function (path, callback) {
    const workbook = new excel.Workbook();
    workbook.xlsx.readFile(path).then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row;
        let etat = {
            num:"",
            produits_exploitation: {
                prod_exploits: 0,//(701->708 - 709 | 731->735,738+74+781   -79)
                prod_immo: 0//(72) 
            },
            charges_exploitation: {
                var_stocks_prod_finis_encours: 0,//71 
                achats_marchandises_consom: 0, //603 +60 , +- 603, 606 
                achats_approvisionnements_consom: 0, //603 ,60, +- 603, 606 
                charges_personnel: 0,//64
                dot_amor_prov: 0,// 681 sauf 6861
                autres_charges_exploit: 0,//606  + 61 + 62 + 63 (autres que 636) + 66

            },
            resultats_exploitation: {
                charges_fin_net: 0,//65+6865 - 75 + 6861
                prod_placements: 0,//(75+ 7866) - (65 + 6866)
                autres_gains_ordi: 0,//736
                autres_pertes_ordi: 0,//636     
            },
            impot_benefice: 0,//691
            elem_extra: 0,//77-67(+-697)
            effet_modif_compta: 0,//+-128
            creatorId: creatorId,
            date_etat:""
        }
        worksheet.eachRow(function (filerow, rowNumber) {
            if (rowNumber > 2) {
                row = worksheet.getRow(rowNumber);
                switch (rowNumber) {
                    case 3:
                        etat.produits_exploitation.prod_exploits = Number(row.getCell(2).value)
                        break;
                    case 4:
                        etat.produits_exploitation.prod_immo = Number(row.getCell(2).value)
                        break;
                    case 7:
                        etat.charges_exploitation.var_stocks_prod_finis_encours = Number(row.getCell(2).value)
                        break;
                    case 8:
                        etat.charges_exploitation.achats_marchandises_consom = Number(row.getCell(2).value)
                        break;
                    case 9:
                        etat.charges_exploitation.achats_approvisionnements_consom = Number(row.getCell(2).value)
                        break;
                    case 10:
                        etat.charges_exploitation.charges_personnel = Number(row.getCell(2).value)
                        break;
                    case 11:
                        etat.charges_exploitation.dot_amor_prov = Number(row.getCell(2).value)
                        break;
                    case 12:
                        etat.charges_exploitation.autres_charges_exploit = Number(row.getCell(2).value)
                        break;
                    case 15:
                        etat.resultats_exploitation.charges_fin_net = Number(row.getCell(2).value)
                        break;
                    case 16:
                        etat.resultats_exploitation.prod_placements = Number(row.getCell(2).value)
                        break;
                    case 17:
                        etat.resultats_exploitation.autres_gains_ordi = Number(row.getCell(2).value)
                        break;
                    case 18:
                        etat.resultats_exploitation.autres_pertes_ordi = Number(row.getCell(2).value)
                        break;
                    case 20:
                        etat.impot_benefice = Number(row.getCell(2).value)
                        break;
                    case 21:
                        etat.elem_extra = Number(row.getCell(2).value)
                        break;
                    case 22:
                        etat.effet_modif_compta = Number(row.getCell(2).value)
                        break;
                }


            }
        });
        callback({ success: true, obj: etat })
    }).catch(err => {
        callback({ success: false, obj: err })
    });

}