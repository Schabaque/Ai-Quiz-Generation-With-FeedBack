import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Quizzes = () => {
  const { user } = useSelector(state => state.auth);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => { fetchQuizzes(); }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('/api/quizzes', { params: { classId: localStorage.getItem('idClasse') } });
      setQuizzes(res.data || []);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container">
      <h3 className="mt-3">Available Quizzes</h3>
      <div className="list-group">
        {quizzes.map(q => (
          <Link key={q._id} className="list-group-item list-group-item-action" to={`/take-quiz/${q._id}`}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{q.titre}</h5>
              <small>{new Date(q.createdAt).toLocaleString()}</small>
            </div>
            <p className="mb-1">Questions: {q.questions.length}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
