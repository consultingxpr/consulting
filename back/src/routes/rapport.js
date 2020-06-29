const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Rapport = require('../models/rapport')


router.get('/today', function (req, res, next) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Rapport.find({ 'createdAt': { $gte: today } }).exec(function (err, commands) {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: err.errors[Object.keys(err.errors)[0]].message });
        } else {
            res.json({ success: true, msg: "Success getting today commands", obj: commands });
        }
    })
});
router.get('/:id', function (req, res, next) {
    Rapport.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: "une erreur s'est produite" });
        } else {
            res.json({ success: true, msg: "Rapport", obj: post });
        }
    });
});
module.exports = router