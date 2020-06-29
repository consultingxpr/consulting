const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const EtatderesultatSchema = mongoose.Schema({
    num:{type:String,required:true},
    produits_exploitation: {
        prod_exploits: { type: Number, default: 0 },
        prod_immo: { type: Number, default: 0 }
    },
    charges_exploitation: {
        var_stocks_prod_finis_encours: { type: Number, default: 0 },
        achats_marchandises_consom: { type: Number, default: 0 },
        achats_approvisionnements_consom: { type: Number, default: 0 },
        charges_personnel: { type: Number, default: 0 },
        dot_amor_prov: { type: Number, default: 0 },
        autres_charges_exploit: { type: Number, default: 0 },

    },
    resultats_exploitation: {
        charges_fin_net: { type: Number, default: 0 },
        prod_placements: { type: Number, default: 0 },
        autres_gains_ordi: { type: Number, default: 0 },
        autres_pertes_ordi: { type: Number, default: 0 },   
    },
    impot_benefice: { type: Number, default: 0 },
    elem_extra: { type: Number, default: 0 },
    effet_modif_compta: { type: Number, default: 0 },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,autopopulate: true },
    date_etat:{type:Date}
}, {
    timestamps: true
});
EtatderesultatSchema.index({
    'num': 'text'
  });
  EtatderesultatSchema.plugin(require('mongoose-autopopulate'));
EtatderesultatSchema.plugin(mongoosePaginate);
EtatderesultatSchema.plugin(beautifyUnique, {
    defaultMessage: "Une erreur c\'est produite: "
  });

module.exports = mongoose.model('Etat', EtatderesultatSchema);