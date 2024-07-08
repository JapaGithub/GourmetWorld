const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


router.get('/:item', homeController.printRandomMeal);
router.get('/:item', homeController.printRandomDrink);