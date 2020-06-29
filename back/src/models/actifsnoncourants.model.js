const mongoose = require('mongoose');

const ActifsnoncourantsSchema = mongoose.Schema({
    // immobilisations incorporelles
    immo_incorp: { type : Number , required : true },
    // immobilisations corporelles
    immo_corp: { type : Number , required : true },
    //immobilisation financiére
    immo_fin : { type : Number , required : true},
    // ammortissement
    amortissement: { type : Number , required : true },
    // provision immobilisations financieres
    provisions : {type : Number , required : true},
    //autres actifs non courant
    autres_actifs_non_courants : {type : Number , required : true},

});

module.exports = ActifsnoncourantsSchema;