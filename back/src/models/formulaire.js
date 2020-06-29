const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoosePaginate = require('mongoose-paginate-v2');
const FormulaireSchema = new mongoose.Schema({
      strategie:{type:String},
      investissement: {type:String},
      manuel: {type:String},
      bailleur: {type:String},
      servicebanque: {type:String},
      changerbanque: {type:String},
      tauxinteret: {type:String},
      coutemprunt: {type:String},
      financerinvestissement: {type:Array},
      courtiers: {type:String},
      materieltransport: {type:Array},
      assurance: {type:String},
      etudefiancieres: {type:String},
      strategierh: {type:String},
      expertsrh: {type:String},
      strategierecrutement:{type:String},
      expertsrecrutement: {type:String},
      solutioncomptable: {type:String},
      creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,autopopulate: true},
    
}, {
    timestamps: true
});
FormulaireSchema.plugin(require('mongoose-autopopulate'));
FormulaireSchema.plugin(mongoosePaginate);
FormulaireSchema.plugin(beautifyUnique, {
    defaultMessage: "Une erreur c\'est produite: "
  });
  

  
  module.exports = mongoose.model('Formulaire', FormulaireSchema);