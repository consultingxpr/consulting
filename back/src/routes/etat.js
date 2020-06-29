const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Etat= require("../models/etatderesultat");

router.get('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({
            message: 'Id is invalid ' + req.params.id
        });
    }
    Etat.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: "Probleme", obj:err });
        } else {
            res.json({ success: true, msg: "Success getting etat", obj: post });
        }
    });
});
module.exports = router