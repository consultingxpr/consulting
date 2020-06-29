const mongoose = require('mongoose');

const CapitauxpropresSchema = mongoose.Schema({
    capital_social : { type : Number , required : true },
    //reserves
    reserves : { type : Number , required : true },
    // autres capitaux propres
    autres_capitaux_propres : { type : Number , required : true },
    // resultat reportées
    resultats_reportees: {type : Number , required : true}
    
});

module.exports = CapitauxpropresSchema ;