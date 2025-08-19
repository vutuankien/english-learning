const router = require('express').Router();



const SpeakingController = require('../controllers/SpeakingController');

router.post('/speaking-assessment', SpeakingController.speakingAssessment);
router.get('/', SpeakingController.getAllSpeaking);

module.exports = router;
