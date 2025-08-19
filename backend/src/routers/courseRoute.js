const router = require('express').Router();
const multer = require('multer');
const path = require('path');


const CourseController = require('../controllers/CourseController');


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('image'), CourseController.createCourse);
router.get('/:id', CourseController.getSingleCourse);
router.get('/', CourseController.getAllCourses);


module.exports = router;
