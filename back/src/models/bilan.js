var mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const mongoosePaginate = require('mongoose-paginate-v2');

const Actifscourants = require('./actifscourants.model.js');
const actifsnoncourants = require('./actifsnoncourants.model');
const capitauxpropres = require('./capitauxpropres.model');
const passifscourants = require('./passifscourants.model');
const passifsnoncourants = require('./passifsnoncourants.model');



var BilanSchema = new mongoose.Schema({
  num:{type:String,required:true},
  actifs_courants: Actifscourants,
  actifs_n_courants: actifsnoncourants,
  capitaux_propres: capitauxpropres,
  passifs_courants: passifscourants,
  passifs_non_courants: passifsnoncourants,
  emprunts_etab_credits: {type:Number},//162
  emprunts_obligatoire: {type:Number},//161
  comptes_courants_assoc_bloque: {type:Number},//1642
  dettes_bancaire: {type:Number},//1621
  dette_fin: {type:Number},//50
  montant_avances_assoc: {type:Number},//1642
  vmp: {type:Number,required:false,default:0},
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,autopopulate: true },
  date_bilan:{type:Date}

}, { timestamps: true });
BilanSchema.index({
  'num': 'text'
});
BilanSchema.plugin(mongoosePaginate);
BilanSchema.plugin(require('mongoose-autopopulate'));
BilanSchema.plugin(beautifyUnique, {
  defaultMessage: "Une erreur c\'est produite: "
});

module.exports = mongoose.model('Bilan', BilanSchema);