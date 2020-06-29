const express = require('express')
const router = express.Router();
const Balance = require('../models/balance');
const Bilan = require('../models/bilan');
const Etat = require('../models/etatderesultat');
const Plan = require('../models/plan')
const multer = require('multer');
const excel = require('exceljs');
const Entity = require('../../config/entity');
const fs = require('fs');
var path = require('path');
const mongoose = require('mongoose');
const middleReader = require('../../config/readerMiddleware');
const Rapport = require('../models/rapport')
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads'); //image storage path
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');
var upmulti = multer({
    storage: storage
}).array("uploads[]", 2);
router.post('/importer-balance/:id/:formId/:date', upload, async function (req, res, next) {
    creatorId = req.params.id;
    formId = req.params.formId;
    date=new Date(req.params.date);
    if (req.file) {
        upload(req, res, async function (err) {
            if (err) {
                // An error occurred when uploading
                return res.status(422).send("an Error occured");
            }
            // No error occured.
            path = req.file.destination + '/' + req.file.filename;
            const workbook = new excel.Workbook();
            var balance_array = [];

            await workbook.xlsx.readFile(path).then(function () {
                var worksheet = workbook.getWorksheet(1);
                var row;
                worksheet.eachRow(function (filerow, rowNumber) {
                    if (rowNumber > 3) {
                        row = worksheet.getRow(rowNumber);
                        balance_array.push({
                            compte: row.getCell(1).value,
                            lib: row.getCell(2).value,
                            credit: Number(row.getCell(3).value),
                            debit: Number(row.getCell(4).value),
                            crediteur: Number(row.getCell(5).value),
                            debiteur: Number(row.getCell(6).value)
                        })

                        console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
                    }
                });
                var values = [];
                for (let item of balance_array) {
                    let a_value = 0;
                    if (item.crediteur && !item.debiteur) {
                        a_value = item.crediteur;
                    } else if (!item.crediteur && item.debiteur) {
                        a_value = item.debiteur;
                    } else {
                        a_value = 0;
                    }
                    values.push({
                        compte: String(item.compte),
                        value: a_value
                    })
                }
                console.log(values)
                const obj = values.reduce((acc, c) => {
                    const classe = c.compte[0] + "" + c.compte[1];
                    acc[classe] = (acc[classe] || []).concat(c.compte);
                    return acc;
                }, {})

                var new_values = Object.entries(obj).map(([classe, comptes]) => {
                    return { classe, comptes }
                }).sort((a, b) => a.classe > b.letters);
                let etat = {
                    num: "",
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
                    creatorId: creatorId
                }
                let bilan = {
                    num: "",
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
                    creatorId: creatorId
                }
                let tot_prod_first = 0;
                let tot_moins_first = 0;
                let tot_prod_sec = 0;
                let tot_moins_sec = 0;
                let placement_one_sec = 0;
                let placement_one_tot = 0;
                let placement_two_sec = 0;
                let placement_two_tot = 0;
                for (let item of new_values) {
                    switch (item.classe) {
                        case "21":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_n_courants.immo_incorp = bilan.actifs_n_courants.immo_incorp + my_value;
                                }

                            })
                            break;
                        case "22":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_n_courants.immo_corp += my_value;
                                }

                            })
                            break;
                        case "26":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_n_courants.immo_fin += my_value;
                                }
                            })
                            break;
                        case "27":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_n_courants.autres_actifs_non_courants += my_value;
                                }
                            })
                            break;
                        case "28":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_n_courants.amortissement += my_value;
                                }
                            })
                            break;
                        case "29":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_n_courants.provisions += my_value;
                                }
                            })
                            break;
                        case "37":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_courants.stocks += my_value;
                                }
                            })
                            break;
                        case "41":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_courants.clients_comptes_rattache += my_value;
                                }
                            })

                            break;
                        case "32":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_courants.autres_actifs_courants += my_value;
                                }
                            })
                            break;
                        case "52":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_courants.autres_actifs_fin += my_value;
                                }
                            })
                            break;
                        case "50": case "51": case "53": case "54": case "55": case "56": case "57": case "58": case "59":
                            //50 dette fin
                            let liste_comptes = item.comptes.filter((num) => num.startsWith("50"));
                            if (liste_comptes && liste_comptes.length > 0) {
                                liste_comptes.map(num => {
                                    let my_value = values.filter(x => x.compte === num);
                                    if (my_value && my_value.length > 0) {
                                        my_value = my_value[0].value;
                                        bilan.dette_fin += my_value;
                                    }

                                })
                            }
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.actifs_courants.liquidite_equiv_liquidite += my_value;
                                }
                            })
                            break;
                        case "10":
                            let ma_comptes = item.comptes.filter((num) => num.startsWith("101"));
                            //case 101
                            if (ma_comptes && ma_comptes.length > 0) {
                                ma_comptes.map(num => {
                                    let my_value = values.filter(x => x.compte === num);
                                    if (my_value && my_value.length > 0) {
                                        my_value = my_value[0].value;
                                        bilan.capitaux_propres.capital_social += my_value;
                                    }
                                })
                            }
                            break;
                        case "11":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.capitaux_propres.reserves += my_value;
                                }
                            })
                            break;
                        case "14":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.capitaux_propres.autres_capitaux_propres += my_value;
                                }
                            })
                            break;
                        case "12":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.capitaux_propres.resultats_reportees += my_value;
                                }
                                if (num == "128") {
                                    etat.effet_modif_compta += my_value
                                }

                            })
                            break;
                        case "16":
                            //162,161,1642,1621,1642
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    switch (num) {
                                        case "162":
                                            bilan.emprunts_etab_credits += my_value;
                                            break;
                                        case "161":
                                            bilan.emprunts_obligatoire += my_value;
                                            break;
                                        case "1642":
                                            bilan.comptes_courants_assoc_bloque += my_value;
                                            break;
                                        case "1621":
                                            bilan.dettes_bancaire += my_value;
                                            break;
                                        case "1642":
                                            bilan.montant_avances_assoc += my_value;
                                            break;
                                    }
                                    bilan.passifs_non_courants.emprunts += my_value;
                                }

                            })
                            break;
                        case "18":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.passifs_non_courants.autres_passif_fin += my_value;
                                }
                            })
                            break;
                        case "15":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.passifs_non_courants.provisions += my_value;
                                }
                            })
                            break;
                        case "40":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.passifs_courants.fournisseurs_comptes_rattache += my_value;
                                }
                            })
                            break;
                        case "41": case "42": case "43": case "45": case "47": case "48":
                            ////4191,4196,4198,425,427,4286,432,4365,4368,437,45,472,48
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value
                                    switch (num) {
                                        case "4191":
                                            bilan.emprunts_etab_credits += my_value;
                                            break;
                                        case "4196":
                                            bilan.emprunts_obligatoire += my_value;
                                            break;
                                        case "4198":
                                            bilan.comptes_courants_assoc_bloque += my_value;
                                            break;
                                        case "425":
                                            bilan.dettes_bancaire += my_value;
                                            break;
                                        case "427":
                                            bilan.montant_avances_assoc += my_value;
                                            break;
                                    }
                                    bilan.passifs_non_courants.emprunts += my_value;
                                }
                            })
                            break;
                        case "56":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    bilan.passifs_courants.concours_bancaire_autres_passifs_fin += my_value;
                                }
                            })
                            break;
                        case "70": case "73": case "74": case "78": case "79":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;

                                    switch (num) {
                                        case "701": case "702": case "703": case "704": case "705": case "706": case "707": case "708":
                                            tot_prod_first += my_value;
                                            break;
                                        case "731": case "732": case "733": case "734": case "735": case "738": case "739": case "741": case "745": case "748": case "781": case "7811": case "78111": case "78112": case "7815": case "7816": case "78161": case "78162": case "7817": case "78173": case "78174": case "7818": case "786": case "7865": case "7866": case "7868":
                                            if (num === "7866") {
                                                placement_one_sec += my_value;
                                            }
                                            tot_prod_sec += my_value;
                                            break;
                                        case "7091": case "7092": case "7094": case "7095": case "7096": case "7097": case "7098":
                                            tot_moins_first += my_value;
                                            break;
                                        case "79":
                                            tot_moins_sec += my_value;
                                            break;

                                    }

                                }
                            })
                            break;
                        case "72":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    etat.produits_exploitation.prod_immo += my_value;
                                }
                            })
                            break;
                        case "71":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    etat.charges_exploitation.var_stocks_prod_finis_encours += my_value;
                                }
                            })
                            break;
                        case "60":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    //603 +60 , 606 
                                    if (num === "606") {
                                        etat.charges_exploitation.autres_charges_exploit += my_value;
                                    }
                                    etat.charges_exploitation.achats_marchandises_consom += my_value;
                                    etat.charges_exploitation.achats_approvisionnements_consom += my_value;
                                }
                            })
                            break;
                        case "64":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    etat.charges_exploitation.charges_personnel += my_value;
                                }
                            })
                            break;
                        case "68":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    switch (num) {
                                        case "6865": case "6861":
                                            etat.charges_fin_net += my_value;
                                            break;
                                        case "6866":
                                            placement_two_sec += my_value;
                                            break;
                                        case "681": case "6811": case "68111": case "68112": case "6812": case "6815": case "6816": case "68161": case "68162": case "6817": case "68173": case "68174": case "6818": case "686": case "6865": case "6866": case "68662": case "68665": case "6868":
                                            etat.charges_exploitation.dot_amor_prov += my_value;
                                            break;
                                    }

                                }
                            })
                            break;
                        case "61": case "62": case "63": case "66":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    if (num != "636") {
                                        etat.charges_exploitation.autres_charges_exploit += my_value;
                                    } else {
                                        etat.resultats_exploitation.autres_pertes_ordi += my_value;
                                    }
                                }
                            })
                            break;
                        case "65": case "75":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    switch (num) {
                                        case "651": case "6511": case "65116": case "65117": case "6515": case "6516": case "6517": case "6518": case "653": case "654": case "655": case "656": case "657": case "658":
                                            etat.resultats_exploitation.charges_fin_net += my_value;
                                            placement_two_tot += my_value;
                                            break;
                                        case "751": case "752": case "753": case "754": case "755": case "756": case "757": case "758":
                                            etat.resultats_exploitation.charges_fin_net -= my_value;
                                            placement_one_tot += my_value;
                                            break;
                                    }
                                }
                            })
                            break;
                        case "73":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    if (num === "736") {
                                        etat.resultats_exploitation.autres_gains_ordi += my_value;
                                    }
                                }
                            })
                            break;

                        case "69":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    if (num === "691") {
                                        etat.impot_benefice += my_value;
                                    } else if (num === "697") {
                                        etat.elem_extra += my_value;
                                    }
                                }
                            })
                            break;

                        case "77": case "67":
                            item.comptes.map(num => {
                                let my_value = values.filter(x => x.compte === num);
                                if (my_value && my_value.length > 0) {
                                    my_value = my_value[0].value;
                                    switch (num) {
                                        case "77":
                                            etat.elem_extra += my_value
                                            break;
                                        case "67":
                                            etaat.elem_extra -= my_value;
                                            break;
                                    }
                                }
                            })
                            break;
                    }
                }

                var balance = new Balance({
                    num: "",
                    balance: balance_array,
                    creatorId: creatorId,
                    bilan: "",
                    etat: "",
                    date_balance:date
                });
                etat.produits_exploitation.prod_exploits = (tot_prod_first - tot_moins_first) + (tot_prod_sec - tot_moins_sec);
                etat.resultats_exploitation.prod_placements = (placement_one_tot - placement_one_sec) + (placement_two_tot - placement_two_sec)


                Entity.getName("bilan", creatorId, function (result) {
                    if (result.success) {
                        bilan.num = result.obj;
                        Entity.getName("etatderesultat", creatorId, function (result) {
                            if (result.success) {
                                etat.num = result.obj;
                                var et = new Etat(etat)
                                var bi = new Bilan(bilan)
                                bi.save(function (err, data) {
                                    if (err) {
                                        console.log(err)
                                        res.json({ success: false, msg: "une erreur s'est produite" });
                                    } else {
                                        et.save(function (err, etat) {
                                            if (err) {
                                                console.log(err)
                                                res.json({ success: false, msg: "une erreur s'est produite" });
                                            } else {
                                                Entity.getName("balance", creatorId, function (result) {
                                                    if (result.success) {
                                                        balance.num = result.obj;
                                                        balance.bilan = data;
                                                        balance.etat = etat;
                                                        balance.save(function (err, data1) {
                                                            if (err) {
                                                                console.log(err)
                                                                res.json({ success: false, msg: "une erreur s'est produite" });
                                                            } else {
                                                                let rapport = {
                                                                    num: "",
                                                                    bilan: data,
                                                                    etat: etat,
                                                                    form: formId,
                                                                    creatorId: creatorId,
                                                                }
                                                                Entity.getName("rapport", creatorId, function (result) {
                                                                    if (result.success) {
                                                                        rapport.num = result.obj;
                                                                        let rap = new Rapport(rapport)
                                                                        rap.save(function (err, data2) {
                                                                            if (err) {
                                                                                console.log(err)
                                                                                res.json({ success: false, msg: "une erreur s'est produite" });
                                                                            } else {
                                                                                res.json({ success: true, msg: "Rapport insérer avec succées", obj: data2 });
                                                                            }
                                                                        })
                                                                    } else {
                                                                        console.log(result.obj)
                                                                        res.json({ success: false, msg: "une erreur s'est produite" });
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    } else {
                                                        console.log(result.obj)
                                                        res.json({ success: false, msg: "une erreur s'est produite" });
                                                    }
                                                })

                                            }
                                        })

                                    }
                                })
                            } else {
                                console.log(result.obj)
                                res.json({ success: false, msg: "une erreur s'est produite" });
                            }
                        })
                    } else {
                        console.log(result.obj)
                        res.json({ success: false, msg: "une erreur s'est produite" });
                    }
                })
            }).catch(err => {
                console.log(err)
                res.json({ success: false, msg: "Une erreur c'est produite" })
            });
        });
    }
});
router.post('/importer-biletat/:id/:index/:formId/:datebil/:datetat', upmulti, async function (req, res, next) {
    creatorId = req.params.id;
    index = req.params.index;
    files = req.files;
    formId = req.params.formId;
    date_bilan=new Date(req.params.datebil);
    date_etat=new Date(req.params.datetat)
    console.log("import called")
    console.log(files)
    if (files && files.length == 2) {

        upmulti(req, res, async function (err) {
            if (err) {
                return res.status(422).send("an Error occured");
            }
            path = "uploads/" + files[index].filename;
            middleReader.readBilan(path, function (result) {
                console.log("bilan read result")
                console.log(result)
                if (result.success) {
                    Entity.getName("bilan", creatorId, function (result1) {
                        if (result1.success) {
                            result.obj.creatorId = creatorId;
                            result.obj.num = result1.obj;
                            result.obj.date_bilan=date_bilan;
                            var bi = new Bilan(result.obj)
                            bi.save(function (err, datab) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    if (Number(index) == 0) {
                                        path = "uploads/" + files[1].filename;
                                    }
                                    else {
                                        path = "uploads/" + files[0].filename;
                                    }
                                    middleReader.readEtat(path, function (result) {
                                        if (result.success) {
                                            Entity.getName("etatderesultat", creatorId, function (result1) {
                                                if (result1.success) {
                                                    result.obj.creatorId = creatorId;
                                                    result.obj.num = result1.obj;
                                                    result.obj.date_etat=date_etat
                                                    var et = new Etat(result.obj);
                                                    et.save(function (err, datae) {
                                                        if (err) {
                                                            console.log(err)
                                                        } else {
                                                            let rapport = {
                                                                num: "",
                                                                bilan: datab._id,
                                                                etat: datae._id,
                                                                form: formId,
                                                                creatorId: creatorId,
                                                            }
                                                            Entity.getName("rapport", creatorId, function (result) {
                                                                if (result.success) {
                                                                    rapport.num = result.obj;
                                                                    let rap = new Rapport(rapport)
                                                                    rap.save(function (err, data2) {
                                                                        if (err) {
                                                                            console.log(err)
                                                                            res.json({ success: false, msg: "une erreur s'est produite" });
                                                                        } else {
                                                                            res.json({ success: true, msg: "Rapport insérer avec succées", obj: data2 });
                                                                        }
                                                                    })
                                                                } else {
                                                                    console.log(result.obj)
                                                                    res.json({ success: false, msg: "une erreur s'est produite" });
                                                                }
                                                            })
                                                        }
                                                    })
                                                } else {
                                                    console.log(result1.obj)
                                                    res.json({ success: false, msg: "une erreur s'est produite" });
                                                }
                                            })

                                        }
                                    })
                                }
                            })
                        } else {
                            console.log(result1.obj)
                            res.json({ success: false, msg: "une erreur s'est produite" });
                        }
                    })

                }
            })
        });
    }
});
router.get('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({ success: false, msg: "id invalid" });
    }
    Balance.findById(req.params.id, function (err, post) {
        if (err) {
            res.json({ success: false, msg: "une erreur s'est produite" });
        } else {
            res.json({ success: true, msg: "Balance insérer avec succées", obj: post });
        }
    });
});


/*router.get('/delete/aa', function(req, res, next){
    Bilan.deleteMany({}, function(err,res) {
        if (err) {
            console.log(err)
        } else {
            
            console.log("success")
         Etat.deleteMany({}, function(err,res) {
                if (err) {
                    console.log(err)
                } else {
                    
                    console.log("success")
                    Balance.deleteMany({}, function(err,res) {
                        if (err) {
                            console.log(err)
                        } else {
                            
                            console.log("success")
                            Rapport.deleteMany({}, function(err,res) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    
                                    console.log("success")
                                    
                                }
                            })
                        }
                    })
                }
            })
        }
    }
);
})*/
module.exports = router