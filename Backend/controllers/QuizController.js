const Quiz = require('../models/Quiz');
const Topic = require('../models/Topic');

// Create a quiz (persist questions generated)
exports.createQuiz = async (req, res) => {
  try {
    const { titre, questions, classId } = req.body;
    const teacherId = req.user ? req.user._id : req.body.teacher;
    const quiz = new Quiz({ titre, teacher: teacherId, class: classId, questions });
    await quiz.save();
    return res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const { teacherId, classId } = req.query;
    const filter = {};
    if (teacherId) filter.teacher = teacherId;
    if (classId) filter.class = classId;
    const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    return res.status(200).json(quiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};
