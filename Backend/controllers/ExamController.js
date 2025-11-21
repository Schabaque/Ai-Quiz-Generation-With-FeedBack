const { func } = require('joi');
const { Answer } = require('../models/Answer');
const { Exams, validateData } = require('../models/Exam');
const { Question } = require('../models/Question');
const axios = require('axios');
require("dotenv").config();

async function CreatExamen(req, res) {
  try {
    const examen = await Exams.create(req.body);
    res.status(201).json(examen);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getAllExam(req, res) {
  try {
    const examen = await Exams.find({}).populate('questions');
    res.status(200).json(examen);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

async function getExamByClassId(req, res) {
  try {
    const exams = await Exams.find({ classe: req.params.classId });
    const count = await Exams.countDocuments({ classe: req.params.classId });

    const examsWithCount = exams.map((exam) => {
      return {
        id: exam.id,
        titre: exam.titre,
        description: exam.description,
        Date_debut: exam.Date_debut,
        Durre: exam.Durre,
        NbQuestion: count,
      };
    });

    res.status(200).json(examsWithCount);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

async function getExamById(req, res) {
  try {
    const examen = await Exams.findById(req.params.id)
      .populate({
        path: "questions",
        populate: {
          path: "answers",
          model: "Answer",
        },
      })
      .exec();

    res.status(200).json(examen);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

async function generateQuiz(req, res) {
  try {
    const apiUrl = 'https://api.openai.com/v1/completions';

    const prompt = `
      génére ${req.body.NbQuestion} questions sur le sujet suivant "${req.body.sujet}" :
      - Questions variées : choix multiples, choix unique et réponse textuelle.
      - Choix multiples : au moins 2 réponses correctes.
      - Choix unique : exactement 1 réponse correcte.
      - Format JSON :
      [
        {
          "id": 1,
          "questionText": "Question ?",
          "questionType": "ChoixMultiple",
          "answers": [
            {"id": 1, "text": "reponse1", "correct": false},
            {"id": 2, "text": "reponse2", "correct": true}
          ]
        }
      ]
    `;

    const params = {
      prompt: prompt,
      temperature: 0.8,
      max_tokens: 1000,
      model: 'text-davinci-003'
    };

    // ---- SECURE: API key from environment ----
    const headers = {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    };

    const response = await axios.post(apiUrl, params, { headers });

    const completionText = response.data.choices[0].text;
    console.log(completionText);

    res.status(200).json(completionText);

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}

async function updateExamen(req, res) {
  try {
    const exam = await Exams.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (exam) {
      res.status(200).json(exam);
    } else {
      res.status(404).json({ error: 'Examen not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Examen' });
  }
}

module.exports = {
  generateQuiz,
  CreatExamen,
  getAllExam,
  getExamById,
  getExamByClassId,
  updateExamen
};
