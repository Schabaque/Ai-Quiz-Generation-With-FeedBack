const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config();

router.post('/', async (req, res) => {
  try {
    const apiUrl = 'https://api.openai.com/v1/completions';

    const prompt = `génére ${req.body.NbQuestion} question sur sujet suivant "${req.body.sujet}"
      -Les questions doivent être de différents types : choix multiples, choix unique, réponse textuelle.
      -Choix multiples : minimum deux réponses correctes.
      -Choix unique : une seule réponse correcte.
      -Format JSON :
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
      ]`;

    const params = {
      prompt: prompt,
      temperature: 0.8,
      max_tokens: 1000,
      model: 'text-davinci-003'
    };

    // SECURE — API KEY FROM ENV
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
});

module.exports = router;
