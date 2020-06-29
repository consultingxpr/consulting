const Formulaire = require('../models/formulaire.js');
const jwt = require('jsonwebtoken') ;
const config = require('../../config/db_config.js');
var bcrypt = require('bcrypt-nodejs');



// Create and Save a new User
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Create a new User
const formulaire = new Formulaire(req.body);
// Save user in the database
formulaire.save()
  .then((data, err) => {
if(err){
        res.json({success:false, msg : err.errors[Object.keys(err.errors)[0]].message});
    }else{
        res.json({success:true, data:data, msg :"formulaire ajoutée avec succées"});
    } 
}).catch(err => {
  console.log(err);
  res.json({success:false, msg : err.errors[Object.keys(err.errors)[0]].message});
  /*res.status(500).send({
  message: err.message || "Something went wrong while creating new user."
});*/
});
};
// trouver les formulaires par utilisateurs
exports.findByUser = (req, res) => {
  let id=req.params.id
  Formulaire.find({creatorId:id}).exec(function (err,formulaires){
    if(err)
    {
      res.json({ success: false, msg: err.errors[Object.keys(err.errors)[0]].message });
    }else{
      res.json({ success: true, msg: "Formulaire by user", obj: formulaires });
    }
  })
 };
 exports.findByUserLast = (req,res)=>{
  let id=req.params.id;
  Formulaire.find({creatorId:id}).sort({ _id: -1 }).limit(1).exec(function (err, formulaires) {
    if(err)
    {
      res.json({ success: false, msg: err.errors[Object.keys(err.errors)[0]].message });
    }else{
      res.json({ success: true, msg: "Formulaire by user", obj: formulaires });
    }

  })
}

