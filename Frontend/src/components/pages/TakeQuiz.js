import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state=>state.auth);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(()=>{ fetchQuiz(); }, [id]);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get(`/api/quizzes/${id}`);
      setQuiz(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const submit = async () => {
    try {
      // prepare answers array
      const payload = Object.keys(answers).map(qid => ({ questionId: qid, answer: answers[qid] }));
      const res = await axios.post(`/api/submissions/${id}`, { answers: payload, student: user?._id });
      alert(`Submitted. Score: ${res.data.score}%`);
      navigate('/Students-Dashboard');
    } catch (err) { console.error(err); alert('Error submitting quiz'); }
  };

  if (!quiz) return <div className="container mt-3">Loading...</div>;

  return (
    <div className="container mt-3">
      <h3>{quiz.titre}</h3>
      {quiz.questions.map((q, idx) => (
        <div key={q._id} className="card mb-3 p-3">
          <div><b>Q{idx+1} ({q.type})</b></div>
          <div dangerouslySetInnerHTML={{__html: q.question}} />
          {q.type === 'mcq' && (
            <div>
              {q.choices.map(c => (
                <div key={c.id} className="form-check">
                  <input className="form-check-input" type="radio" name={q._id} id={`${q._id}_${c.id}`} onChange={()=>handleChange(q._id, c.text)} />
                  <label className="form-check-label" htmlFor={`${q._id}_${c.id}`}>{c.text}</label>
                </div>
              ))}
            </div>
          )}
          {q.type === 'fitb' && (
            <div>
              <input className="form-control" onChange={e=>handleChange(q._id, e.target.value)} placeholder="Type your answer" />
            </div>
          )}
        </div>
      ))}
      <button className="btn btn-primary" onClick={submit}>Submit Quiz</button>
    </div>
  );
};

export default TakeQuiz;
