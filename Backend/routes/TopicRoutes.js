const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/TopicController');
const upload = require('../middlewares/photoUpload');

// Create topic (multipart/form-data with optional image)
router.post('/', upload.single('image'), TopicController.createTopic);

// Get topics
router.get('/', TopicController.getTopics);

// Generate quiz from topics
router.post('/generate', TopicController.generateQuiz);

module.exports = router;
