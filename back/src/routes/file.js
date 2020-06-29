const express = require('express');
const router = express.Router();
const Resize = require("../../config/resize");
const upload = require ("../../config/uploadMiddleware")
const path = require('path');
const Entity=require('../../config/entity');
const passport = require('passport');


router.post('/upload', upload.single('image'), async function (req, res) {
    const imagePath = '../../uploads/';
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({success:false,error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    const imgSrc="/uploads/"+filename;
    return res.status(200).json({success:true, name: imgSrc });
});
router.put('/:skip/:limit', function (req, res, next) {

  var sort = req.body.sort;
  var sortOrder = req.body.sortOrder;
  var myquery=null;
  if(req.body.query)
  {
      myquery=req.body.query;
  }
  let obj = { active: 1, createdAt:-1}
  if(sort)
  {
    if (sort.length > 0) {
        for (let i = 0; i < sort.length; i++) {
            obj[sort[i]] = sortOrder[i];
        }
    } else {
        obj = {createdAt:-1};
    }
  }
  let query = {};
  if (req.body.searchText && req.body.searchText.length > 0) {
        query = {
            $and: [{
                $text: {
                    $search: req.body.searchText
                }
            }]
        };
      req.params.offset = 0;
  }

  if(myquery)
        query = {...query, ...myquery};

  var options = {
      sort: obj,
      offset: req.params.offset,
      limit: req.params.limit
  };
  Entity.getEntity(req.body.entity).paginate(query, options, function (err, result) {
      if (err) {
          res.json({ success: false, msg: err });
      } else {
          res.json({ success: true, msg: "Success getting items", obj: result });
      }
  });
})
router.get('/nbr/:entity',function (req, res, next){
  var ent=req.params.entity;
      Entity.getEntity(ent).find().count(function(err, count){
        if(err) return next(err);
        res.json(count);
    });
})
router.get('/nbr/:entity/:id',function (req, res, next){
    var ent=req.params.entity;
    var creatorId=req.params.id
        Entity.getEntity(ent).find({creatorId:creatorId}).count(function(err, count){
          if(err) return next(err);
          res.json(count);
      });
  })



  module.exports = router;  
