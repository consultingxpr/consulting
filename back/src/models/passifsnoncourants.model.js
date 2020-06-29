const mongoose = require('mongoose');

const PassifsnoncourantsSchema = mongoose.Schema({

    emprunts : { type : Number , required : true },
    // autres passifs financiers
    autres_passif_fin : { type : Number , required : true },
    provisions : { type : Number , required : true }
});

module.exports = PassifsnoncourantsSchema;