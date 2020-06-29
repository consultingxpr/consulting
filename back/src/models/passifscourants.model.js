const mongoose = require('mongoose');

const PassifscourantsSchema = mongoose.Schema({
    // fournisseurs et comptes rattachés 
    fournisseurs_comptes_rattache : { type : Number , required : true },
    // autres passifs courants
    autres_passifs_courants : { type : Number , required : true },
    // concours banquaires
    concours_bancaire_autres_passifs_fin : { type : Number , required : true }
});

module.exports = PassifscourantsSchema;
