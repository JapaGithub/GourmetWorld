const express = require('express');
const router = express.Router();
const gastronomyController = require('../controllers/gastronomyController');

router.get('/', gastronomyController.fetchRandomData);
router.get('/:url', gastronomyController.fetchData);
router.get('/:drinks', gastronomyController.printMeals);

module.exports = router;