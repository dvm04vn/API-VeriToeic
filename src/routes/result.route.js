import express from 'express';
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/submit', resultController.submitResult);
router.get('/quiz/:quizId', resultController.getResultByQuiz);

export default router;
