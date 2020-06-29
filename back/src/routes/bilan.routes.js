const express = require('express')
const router = express.Router()
const bilanController = require('../controllers/bilan.controllers');
// Retrieve all bilans
router.get('/', bilanController.findAll);
// Create a new bilan
router.post('/', bilanController.create);
// Retrieve a single bilan with id
router.get('/:id', bilanController.findOne);
// Update bilan with id
router.put('/:id', bilanController.update);
// Delete bilan with id
router.delete('/:id', bilanController.delete);
module.exports = router