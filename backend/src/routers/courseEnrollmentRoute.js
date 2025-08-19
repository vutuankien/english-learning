const express = require('express');
const router = express.Router();
const CourseEnrollmentController = require('../controllers/CourseEnrollmentController');

router.post('/enroll/:course_id/:user_id', CourseEnrollmentController.enrollCourse);

// Lấy danh sách khóa học user đã đăng ký
router.get('/user/:user_id', CourseEnrollmentController.getCoursesByUser);

// Lấy danh sách user đã đăng ký một khóa học
router.get('/course/:course_id', CourseEnrollmentController.getUsersByCourse);

module.exports = router;