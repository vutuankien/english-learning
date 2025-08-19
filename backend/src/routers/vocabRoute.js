const router = require('express').Router();

const vocabController = require('../controllers/vocabController');



router.post('/', vocabController.createVocab);
router.put('/:id', vocabController.updateVocab);
router.delete('/:id', vocabController.deleteVocab);
router.get('/getByUnit/:courseId/:unit', vocabController.getVocabByUnit);
router.get('/getByCourse/:courseId', vocabController.getVocabByCourse);
router.get('/:id', vocabController.getSingleVocab);
router.get('/', vocabController.getAllVocab);

module.exports = router;
