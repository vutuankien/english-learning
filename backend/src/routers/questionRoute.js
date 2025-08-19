const router = require('express').Router();

const multer = require('multer');
const upload = multer();
const QuestionController = require('../controllers/questionController');


router.post('/update/:courseId/:id', QuestionController.updateQuestion);
router.delete('/:id', QuestionController.deleteQuestion);
router.post('/create/:courseId', QuestionController.createQuestion);
router.get('/random', QuestionController.getRandomQuestion);
router.get('/:id', QuestionController.getSingleQuestion);
router.get('/', QuestionController.getAllQuestions);

module.exports = router;
