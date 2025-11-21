const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  image: {
    url: { type: String },
    public_id: { type: String }
  },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Topic', TopicSchema);
