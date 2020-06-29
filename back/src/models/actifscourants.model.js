const mongoose = require('mongoose');

const ActifscourantsSchema = mongoose.Schema({
    stocks : { type : Number , required : true },
    // clients et comptes rattachés 
    clients_comptes_rattache: { type : Number , required : true },
    //autres actifs courants
    autres_actifs_courants:{type:Number,required:true},
    // placements et autres actifs courants
    placements_autres_actifs_fin : { type : Number , required : true },
    // liquidité et équivalent de liquidité
    liquidite_equiv_liquidite : {type : Number , required : true},
});

module.exports = ActifscourantsSchema ;