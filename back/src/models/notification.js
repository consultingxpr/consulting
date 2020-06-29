var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var NotificationSchema   = new Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true,unique:false},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:false,unique:false},
    receiver_general:[{type:mongoose.Schema.Types.ObjectId, ref:'User', required:false,unique:false}],
    title: String,
    message: String,
    link: { url:{type:String},params:{type:String},paramsValue:{type:String}},
    image:    { type: String, unique: false,required:false},
    read_by:[{
      _id: false,
     readerId:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:false,unique:false},
     read_at: {type: Date, default: Date.now}
    }],
  }, {timestamps: true});

  NotificationSchema.plugin(beautifyUnique, {
    defaultMessage: "Un erruer c\'est produit: "
});



const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;