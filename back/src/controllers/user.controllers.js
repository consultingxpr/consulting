const User = require('../models/user');
const jwt = require('jsonwebtoken') ;
const config = require('../../config/db_config.js');
var bcrypt = require('bcrypt-nodejs');


// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
User.find()
  .then(users => {
  res.send(users);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of users."
});
});
};
// Create and Save a new User
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Create a new User
const user = new User(req.body);
// Save user in the database
user.save()
  .then((data, err) => {
if(err){
        res.json({success:false, msg : err.errors[Object.keys(err.errors)[0]].message});
    }else{
        res.json({success:true, data:data, msg :"Inscription établie avec succées"});
    } 
}).catch(err => {
  console.log(err);
  res.json({success:false, msg : err.errors[Object.keys(err.errors)[0]].message});
  /*res.status(500).send({
  message: err.message || "Something went wrong while creating new user."
});*/
});
};
// Find a single User with a id
exports.findOne = (req, res) => {
 User.findById(req.params.id)
  .then(user => {
  if(!user) {
   return res.status(404).send({
   message: "User not found with id " + req.params.id
 });
}
 res.send(user);
 
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "User not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting user with id " + req.params.id
});
});
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  if(req.body.password && req.body.password.length < 50){
    bcrypt.hash(req.body.password, null , null , function(err,hash){
        if(err) return next(err);
          req.body.password = hash;
 
    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if(err){
          res.json({success:false, msg : err.errors[Object.keys(err.errors)[0]].message});
        }else{
            res.json({success:true, msg :"Mise à jour aves succès"});
        } 
    });
});
}
else{  
delete req.body.password;
delete req.body.cpassword;
User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
  if(err){
        res.json({success:false, msg : err.errors[Object.keys(err.errors)[0]].message});
    }else{
        res.json({success:true, msg :"Mise à jour aves succès"});
    } 
});
}
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
User.findByIdAndRemove(req.params.id)
.then(user => {
if(!user) {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
res.send({message: "user deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete user with id " + req.params.id
});
});
};
// authentification
exports.auth = (req, res, next) => {
  const email = req.body.email ;
  const password = req.body.password ;
      User.findOne({email:email}, (err, user) =>{
      if(err) console.log(err) ;
      if(!user){
          return res.json({success : false, msg : "L ' email entré ne correspond à aucun compte"});
      }
      bcrypt.compare(password,user.password, (err, isMatch) => {
        if(err) throw err ;
      if(isMatch){
        delete user.password;
        let userToken = new User(user);
        let finalToken = userToken.toJSON()
        delete finalToken.password;
         const token = jwt.sign(finalToken, config.secret, {
              expiresIn: 28800 
          });
          res.json({
              success : true,
              token : 'XPRS '+token,
              user : userToken
          })
      }
      else{
          return res.json({success : false, msg : "Mot de passe incorrect"}); 
      }
      });

      
  });
}
