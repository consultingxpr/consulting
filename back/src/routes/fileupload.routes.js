const express = require('express')
const router = express.Router()
const fileuploadController = require('../controllers/fileupload.controllers');


// Create a new user
router.post('/upload1', fileuploadController.create1);







module.exports = router