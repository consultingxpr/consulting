const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Bilan= require("../models/bilan");

router.get('/', function (req, res, next) {
    Bilan.find().sort('-createdAt').exec(function (err, fournisseurs) {
        if (err) {
            res.json({ success: false, msg: err.errors[Object.keys(err.errors)[0]].message });
        } else {
            res.json({ success: true, msg: "Success getting fournisseurs", obj: fournisseurs });
        }
    });
});
router.get('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({
            message: 'Id is invalid ' + req.params.id
        });
    }
    Bilan.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: "Probleme", obj:err });
        } else {
            res.json({ success: true, msg: "Success getting bilan", obj: post });
        }
    });
});
module.exports = router