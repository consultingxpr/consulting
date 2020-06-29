const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controllers');
// Retrieve all admins
router.get('/', adminController.findAll);
// Create a new admin
router.post('/', adminController.create);
// Retrieve a single admin with id
router.get('/:id', adminController.findOne);
// Update a admin with id
router.put('/:id', adminController.update);
// Delete a admin with id
router.delete('/:id', adminController.delete);
module.exports = router