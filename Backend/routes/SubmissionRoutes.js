const express = require('express');
const router = express.Router();
const SubmissionController = require('../controllers/SubmissionController');

// submit answers for quiz
router.post('/:quizId', SubmissionController.submitQuiz);

// get submissions for quiz
router.get('/quiz/:quizId', SubmissionController.getSubmissionsByQuiz);

module.exports = router;
