const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Formulaire = require('../models/formulaire.js');
const formulaireController = require('../controllers/formulaire.controllers');

// Create a new formulaire
router.post('/create', formulaireController.create);
router.get('/user/:id', formulaireController.findByUser);
router.get('/last/:id', formulaireController.findByUserLast);
//Update fournisseur
router.put('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({
            message: 'Id is invalid ' + req.params.id
        });
    }
    Formulaire.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: err.errors[Object.keys(err.errors)[0]].message });
        } else {
            res.json({ success: true, msg: "Modification effectué avec succès", obj: post });
        }
    });
});

module.exports = router