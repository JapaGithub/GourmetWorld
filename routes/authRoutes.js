const express = require('express');

const authController = require('../controllers/authControllers');

const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`Hello usuario ${req.id}`);
});

module.exports = router;