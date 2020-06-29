const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Notification = require('../models/notification');
const status = require('http-status');
/* POST: save a new Notification */
router.post('/create', function (req, res, next) {
    var data = req.body;
    var newNotification = new Notification();
    newNotification.sender=data.sender;
    if (data.general)
    {
        newNotification.receiver_general = data.receiver_general;
    }else{
        newNotification.receiver=data.receiver;
    }
    newNotification.title = data.title;
    newNotification.image = data.image;
    newNotification.message = data.message;
    newNotification.image=data.image;
    newNotification.link = data.link;
    // save the Notification
    newNotification.save(function (err, notification) {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: err.errors[Object.keys(err.errors)[0]].message });
        } else {
            res.json({ success: true, msg: "notification créé avec succès",obj:notification });
            if (data.general) {
                for (var i in newNotification.receiver_general) {
                    req.app.io.emit(newNotification.receiver_general[i], 'notif for you !');
                }
            }else{
                req.app.io.emit(newNotification.receiver, 'notif for you !');
            }
            
           

        }
    });
});


/* GET a Notification by receiver ID. */
router.get('/user/:userId', function (req, res, next) {
    var userId = req.params.userId;

    // Check first if it is a valid Id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({
            message: 'Notification Id is invalid ' + userId
        });
    }
    //needed for user notification
    /**{ $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}, */
    Notification.find({ $or:[{'receiver': userId},{'receiver_general':userId}] }).sort('-createdAt').limit(15).exec(function (err, notificationFounded) {
        if (err){ 
            console.log(err);
            return res.status(status.BAD_REQUEST).json(err)
        };
        // We serve as json the Notifications founded
        res.status(status.OK).json(notificationFounded);
    });

});





/* GET all saved Notifications */
router.get('/', function (req, res, next) {
    Notification.find({}, function (err, notifications) {
        if (err) return res.status(status.BAD_REQUEST).json(err);

        // object of all the Notifications
        res.status(status.OK).json(notifications);
    });
});

/* DELETE: delete a Notification by id */
router.delete('/Notification/:notificationId', function (req, res, next) {
    var notificationId = req.params.notificationId;

    // find the notification by id and remove it
    Notification.findByIdAndRemove(notificationId, function (err) {
        if (err) return res.status(status.BAD_REQUEST).json(err);

        // The notification has been deleted
        res.status(status.OK).json({ message: 'SUCCESS' });
    });
});


router.put('/seen/:userid', function (req, res, next) {
    const userid = mongoose.Types.ObjectId(req.params.userid);

    Notification.updateMany({ 'receiver': userid, 'read_by.readerId': { $ne: userid } }, {
        $push: {
            "read_by": {
                readerId: userid
            }
        }
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });


});


module.exports = router;