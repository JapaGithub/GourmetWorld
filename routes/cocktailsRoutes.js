const express = require('express');
const router = express.Router();
const cocktailsController = require('../controllers/cocktailsController');

router.get('/', cocktailsController.fetchRandomData);
router.get('/:url', cocktailsController.fetchData);
router.get('/:drinks', cocktailsController.printDrinks);

module.exports = router;