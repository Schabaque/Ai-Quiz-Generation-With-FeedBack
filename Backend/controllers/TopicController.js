const Topic = require('../models/Topic');
const cloudinary = require('../utils/cloudinary');

// Create a topic (text + optional image)
exports.createTopic = async (req, res) => {
  try {
    const { titre, description, classId } = req.body;
    const teacherId = req.user ? req.user._id : req.body.teacher; // if auth middleware sets req.user

    const topic = new Topic({ titre, description, teacher: teacherId, class: classId });

    // handle image upload if present (expects uploaded file in req.file)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'topics' });
      topic.image = { url: result.secure_url, public_id: result.public_id };
    }

    await topic.save();
    return res.status(201).json(topic);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get topics (optionally by teacher or class)
exports.getTopics = async (req, res) => {
  try {
    const { teacherId, classId } = req.query;
    const filter = {};
    if (teacherId) filter.teacher = teacherId;
    if (classId) filter.class = classId;

    const topics = await Topic.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Simple local quiz generator: returns array of questions for given topic ids
// Supports MCQ (3 distractors) and fill-in-the-blank (remove a key word)
exports.generateQuiz = async (req, res) => {
  try {
    const { topicIds = [], numQuestions = 5, types = ['mcq','fitb'] } = req.body;
    const topics = await Topic.find({ _id: { $in: topicIds } });

    const questions = [];
    // naive generation: split description/titre into sentences/words and create Qs
    topics.forEach((topic) => {
      const source = (topic.description || topic.titre || '').trim();
      if (!source) return;

      // generate one MCQ: choose a term as answer and make distractors by scrambling
      if (types.includes('mcq')) {
        const words = source.split(/\s+/).filter(w => w.length > 3);
        if (words.length >= 1) {
          const answer = words[0];
          const choices = [answer];
          // create simple distractors
          for (let i=0; i<3; i++) {
            const w = words[(i+1) % words.length] || (answer + i);
            choices.push(w + (i+1));
          }
          questions.push({
            topic: topic._id,
            type: 'mcq',
            question: `About ${topic.titre}: Which of the following is correct?`,
            choices: shuffleArray(choices).map((c, idx) => ({ id: idx+1, text: c })),
            answer: answer
          });
        }
      }

      // generate a fill-in-the-blank by removing a key word
      if (types.includes('fitb')) {
        const sentences = source.split(/[\.\?!]/).map(s=>s.trim()).filter(Boolean);
        const s = sentences[0] || source;
        const words = s.split(/\s+/);
        if (words.length > 3) {
          const idx = Math.floor(words.length/2);
          const answer = words[idx].replace(/[^a-zA-Z0-9]/g,'');
          words[idx] = '_____';
          questions.push({
            topic: topic._id,
            type: 'fitb',
            question: words.join(' '),
            answer: answer
          });
        }
      }
    });

    // trim to requested number
    const limited = questions.slice(0, numQuestions);
    return res.status(200).json({ questions: limited });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

function shuffleArray(a){
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
