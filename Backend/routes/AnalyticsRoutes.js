const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/AnalyticsController');

// Get weak topics for a student
router.get('/student/:studentId/weak-topics', AnalyticsController.getStudentWeakTopics);

// Get weak topics for a class (aggregate)
router.get('/class/:classId/weak-topics', AnalyticsController.getClassWeakTopics);

module.exports = router;
