const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const UserController = require('../controllers/UserController');

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Update user info and/or upload avatar image
router.put('/update/:id', upload.single('avatar'), UserController.updateUser);

router.get('/getSingleUser/:id', UserController.getSingleUser);
router.get("/", UserController.getAllUser);

module.exports = router;
