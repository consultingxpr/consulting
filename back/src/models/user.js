const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoosePaginate = require('mongoose-paginate-v2');
const UserSchema = mongoose.Schema({
    raisonsocial: { type : String , required : function(){return !this.isAdmin}, unique : 'la raison sociale est deja utilisée'},
    formejuridique: { type : String , required : function(){return !this.isAdmin} , unique : false},
    secteur: {type : String, required : function(){return !this.isAdmin} , unique : false},
    autresecteur: {type : String, required : function(){return this.secteur =='Autres services'}, unique : false},
    tel: {type :Number, required : function(){return !this.isAdmin} , unique : false},
    Date: { type : Date , required :function(){return !this.isAdmin} , unique : false},
    sigle: {type : String, required : false , unique : false},
    codepostal: {type :Number, required :function(){return !this.isAdmin} , unique : false},
    ville: { type : String , required : function(){return !this.isAdmin} , unique : false},
    pays: {type : String, required : function(){return !this.isAdmin} , unique : false},
    etat: {type : String, required : function(){return !this.isAdmin} ,unique : false},
    fax: {type :Number, required : false , unique : false},
    password : {type:String, required:true, unique:false},
    enseigne: { type:String,required:false,unique: false},
    matriculefiscal : {type:String,required:function(){return !this.isAdmin},unique: 'Le matricule fiscal \"{VALUE}\" est déja utilisé'},
    adresse : {type:String,required:function(){return !this.isAdmin},unique:false},
    representant : {type:String,required:function(){return !this.isAdmin},unique:false},
    email : { type:String,required:true,unique:false},
    isAdmin:{type:Boolean,default:false},
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});
UserSchema.index({
  'raisonsocial': 'text',
    'formejuridique': 'text',
    'secteur': 'text',
    'tel': 'text',
    'ville': 'text',
    'pays': 'text',
    'etat': 'text',
    'fax': 'text',
    'matriculefiscal' : 'text',
    'adresse' : 'text',
    'representant' : 'text',
    'email' : 'text'
});
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(beautifyUnique, {
  defaultMessage: "Une erreur c\'est produite: "
});

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null , null , function(err,hash){
      if(err) return next(err);
        user.password = hash;
        next();
    });
  });

module.exports = mongoose.model('User', UserSchema);

