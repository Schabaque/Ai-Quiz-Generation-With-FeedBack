const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  type: { type: String, enum: ['mcq','fitb'], required: true },
  question: { type: String, required: true },
  choices: [{ id: Number, text: String }],
  answer: { type: String }
});

const QuizSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);
