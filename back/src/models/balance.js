const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoosePaginate = require('mongoose-paginate-v2');
const BalanceSchema = new mongoose.Schema({
      num:{type:String,required:true},
      balance:[{
          _id:false,
          compte:{type:Number,required:true},
          lib:{type:String,required:true},
          debit:{type:Number,min:0,required:true},
          credit:{type:Number,min:0,required:true},
          debiteur:{type:Number,min:0,required:true},
          crediteur:{type:Number,min:0,required:true},
      }],
      bilan: { type: mongoose.Schema.Types.ObjectId, ref: 'Bilan', required: true, unique:true,autopopulate: true },
      etat: { type: mongoose.Schema.Types.ObjectId, ref: 'Etat', required: true,unique:true,autopopulate: true },
      creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,autopopulate: true },
      date_balance:{type:Date,required:true}
    
}, {
    timestamps: true
});
BalanceSchema.index({
    'num': 'text'
  });
BalanceSchema.plugin(mongoosePaginate);
BalanceSchema.plugin(require('mongoose-autopopulate'));
BalanceSchema.plugin(beautifyUnique, {
    defaultMessage: "Une erreur c\'est produite: "
  });
  

  module.exports = mongoose.model('Balance', BalanceSchema);