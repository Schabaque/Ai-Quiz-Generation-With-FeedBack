const Submission = require('../models/Submission');
const Quiz = require('../models/Quiz');

// Submit answers to a quiz and compute score
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // array of { questionId, answer }
    const studentId = req.user ? req.user._id : req.body.student;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    // compute score
    let correct = 0;
    for (const a of answers) {
      const q = quiz.questions.id(a.questionId) || quiz.questions.find(qq => String(qq._id) === String(a.questionId));
      if (!q) continue;
      if (q.type === 'mcq') {
        // compare text or id
        if (String(a.answer).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) correct++;
      } else if (q.type === 'fitb') {
        if (String(a.answer).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) correct++;
      }
    }
    const score = Math.round((correct / quiz.questions.length) * 100);

    const submission = new Submission({ quiz: quizId, student: studentId, answers, score });
    await submission.save();

    return res.status(201).json({ submission, score });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};

exports.getSubmissionsByQuiz = async (req, res) => {
  try {
    const submissions = await Submission.find({ quiz: req.params.quizId });
    return res.status(200).json(submissions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};
