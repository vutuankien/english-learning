const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../Middlewares/AuthMiddleWare');

// Add the express.json() middleware to this router to parse JSON request bodies.
router.use(express.json());

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', verifyToken, AuthController.logout);

module.exports = router;
