const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');
const User=require('../models/user')
router.get('/ad/adminids', function(req,res,next) {
    User.find({isAdmin:true}).exec(function (err, users) {
     if (err) {
         console.log(err)
         res.json({ success: false, msg: err.errors[Object.keys(err.errors)[0]].message });
     } else {
         let adminIds=[];
         for(let user of users)
         {
           adminIds.push(user._id)
         }
         res.json({ success: true, msg: "Success getting admin ids", obj: adminIds });
     }
 })
 })
// Retrieve all users
router.get('/', userController.findAll);
// Create a new user
router.post('/create', userController.create);
// Retrieve a single user with id
router.get('/:id', userController.findOne);
// Update a user with id
router.put('/:id', userController.update);
// Delete a user with id
router.delete('/:id', userController.delete);
// authentification
router.post('/connexion', userController.auth);



module.exports = router