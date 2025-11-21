const Submission = require('../models/Submission');
const Quiz = require('../models/Quiz');
const Topic = require('../models/Topic');

// Compute weak topics for a specific student (topics where they scored poorly)
exports.getStudentWeakTopics = async (req, res) => {
  try {
    const { studentId } = req.params;
    const submissions = await Submission.find({ student: studentId }).populate('quiz');
    
    const topicScores = {}; // { topicId: { correct: 0, total: 0 } }
    
    for (const sub of submissions) {
      if (!sub.quiz || !sub.quiz.questions) continue;
      for (const q of sub.quiz.questions) {
        if (!q.topic) continue;
        const topicId = String(q.topic);
        if (!topicScores[topicId]) topicScores[topicId] = { correct: 0, total: 0 };
        topicScores[topicId].total++;
        
        // check if student answered correctly
        const studentAns = sub.answers.find(a => String(a.questionId) === String(q._id));
        if (studentAns && String(studentAns.answer).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) {
          topicScores[topicId].correct++;
        }
      }
    }
    
    // compute accuracy per topic and sort by weakness (lowest first)
    const weakTopics = Object.entries(topicScores)
      .map(([topicId, scores]) => ({
        topicId,
        accuracy: Math.round((scores.correct / scores.total) * 100),
        total: scores.total
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
    
    // fetch topic details
    const topicIds = weakTopics.map(wt => wt.topicId);
    const topics = await Topic.find({ _id: { $in: topicIds } });
    
    const result = weakTopics.map(wt => {
      const topic = topics.find(t => String(t._id) === wt.topicId);
      return { ...wt, topic: topic ? { _id: topic._id, titre: topic.titre } : null };
    });
    
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};

// Compute weak topics for a class (aggregate scores across all students)
exports.getClassWeakTopics = async (req, res) => {
  try {
    const { classId } = req.params;
    
    // find all quizzes for the class
    const quizzes = await Quiz.find({ class: classId });
    const quizIds = quizzes.map(q => q._id);
    
    // find all submissions for those quizzes
    const submissions = await Submission.find({ quiz: { $in: quizIds } }).populate('quiz');
    
    const topicScores = {}; // { topicId: { correct: 0, total: 0, studentCount: Set } }
    
    for (const sub of submissions) {
      if (!sub.quiz || !sub.quiz.questions) continue;
      for (const q of sub.quiz.questions) {
        if (!q.topic) continue;
        const topicId = String(q.topic);
        if (!topicScores[topicId]) topicScores[topicId] = { correct: 0, total: 0, students: new Set() };
        topicScores[topicId].total++;
        topicScores[topicId].students.add(String(sub.student));
        
        // check if student answered correctly
        const studentAns = sub.answers.find(a => String(a.questionId) === String(q._id));
        if (studentAns && String(studentAns.answer).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) {
          topicScores[topicId].correct++;
        }
      }
    }
    
    // compute accuracy per topic
    const classWeak = Object.entries(topicScores)
      .map(([topicId, scores]) => ({
        topicId,
        accuracy: Math.round((scores.correct / scores.total) * 100),
        total: scores.total,
        studentCount: scores.students.size
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
    
    // fetch topic details
    const topicIds = classWeak.map(wt => wt.topicId);
    const topics = await Topic.find({ _id: { $in: topicIds } });
    
    const result = classWeak.map(wt => {
      const topic = topics.find(t => String(t._id) === wt.topicId);
      return { ...wt, topic: topic ? { _id: topic._id, titre: topic.titre } : null };
    });
    
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};
