const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/:id', formController.getElementById);
router.get('/', formController.publicarMensaje);

module.exports = router;