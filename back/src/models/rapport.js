const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoosePaginate = require('mongoose-paginate-v2');
const RapportSchema = new mongoose.Schema({
      num:{type:String,required:true},
      bilan: { type: mongoose.Schema.Types.ObjectId, ref: 'Bilan', required: true, unique:true,autopopulate: true },
      etat: { type: mongoose.Schema.Types.ObjectId, ref: 'Etat', required: true,unique:true,autopopulate: true },
      form:{type: mongoose.Schema.Types.ObjectId, ref: 'Formulaire', required: true,autopopulate: true},
      creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,autopopulate: true },
    
}, {
    timestamps: true
});
RapportSchema.index({
    'num': 'text'
  });
RapportSchema.plugin(mongoosePaginate);
RapportSchema.plugin(require('mongoose-autopopulate'));
RapportSchema.plugin(beautifyUnique, {
    defaultMessage: "Une erreur c\'est produite: "
  });
  

  module.exports = mongoose.model('Rapport', RapportSchema);