const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/QuizController');

// create a quiz (persisted)
router.post('/', QuizController.createQuiz);

// list quizzes
router.get('/', QuizController.getQuizzes);

// get specific quiz
router.get('/:id', QuizController.getQuizById);

module.exports = router;
