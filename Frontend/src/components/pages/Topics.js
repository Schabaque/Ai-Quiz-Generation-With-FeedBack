import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Topics = () => {
  const { user } = useSelector(state => state.auth);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [topics, setTopics] = useState([]);
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  const teacherId = user?._id || localStorage.getItem('userId');

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await axios.get('/api/topics', { params: { teacherId } });
      setTopics(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const submitTopic = async (e) => {
    e.preventDefault();
    if (!titre.trim()) return alert('Title is required');
    try {
      setLoading(true);
      const form = new FormData();
      form.append('titre', titre);
      form.append('description', description);
      form.append('teacher', teacherId);
      if (file) form.append('image', file);

      const res = await axios.post('/api/topics', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTitre('');
      setDescription('');
      setFile(null);
      setTopics(prev => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Error creating topic');
    } finally { setLoading(false); }
  };

  const generateQuiz = async (topicId) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/topics/generate', { topicIds: [topicId], numQuestions: 5 });
      setGenerated(res.data.questions || []);
    } catch (err) {
      console.error(err);
      alert('Error generating quiz');
    } finally { setLoading(false); }
  };

  const saveGeneratedQuiz = async (title) => {
    if (!generated || generated.length === 0) return alert('No generated questions to save');
    if (!title || !title.trim()) return alert('Please provide a quiz title');
    try {
      setLoading(true);
      const payload = {
        titre: title,
        questions: generated,
        classId: localStorage.getItem('idClasse') || null,
        teacher: teacherId
      };
      const res = await axios.post('/api/quizzes', payload);
      alert('Quiz saved');
      // optionally navigate to quizzes or clear generated
      setGenerated(null);
      fetchTopics();
    } catch (err) {
      console.error(err);
      alert('Error saving quiz');
    } finally { setLoading(false); }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3>Topics (Teacher)</h3>
        <div>
          <Link to="/Quizzes" className="btn btn-outline-primary btn-sm me-2">Go to Quizzes</Link>
          <Link to="/Students-Dashboard" className="btn btn-outline-secondary btn-sm">Student Dashboard</Link>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={submitTopic} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input className="form-control" value={titre} onChange={e=>setTitre(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Image (optional)</label>
              <input type="file" className="form-control" onChange={e=>setFile(e.target.files[0])} accept="image/*" />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Topic'}</button>
          </form>
        </div>
      </div>

      <h5>Your topics</h5>
      <div className="row">
        {topics.map(t => (
          <div className="col-md-4" key={t._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h6>{t.titre}</h6>
                <p>{t.description}</p>
                {t.image?.url && <img src={t.image.url} alt={t.titre} style={{maxWidth:'100%'}} />}
                <div className="mt-2">
                  <button className="btn btn-sm btn-outline-success me-2" onClick={()=>generateQuiz(t._id)}>Generate Quiz</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {generated && (
        <div className="card mt-3">
          <div className="card-body">
            <h5>Generated Questions</h5>
            <div className="mb-3">
              <label className="form-label">Quiz title to save</label>
              <input className="form-control mb-2" id="saveQuizTitle" placeholder="Enter quiz title" />
              <button className="btn btn-success btn-sm" onClick={() => saveGeneratedQuiz(document.getElementById('saveQuizTitle').value)} disabled={loading}>Save Quiz</button>
            </div>
            {generated.map((q, i) => (
              <div key={i} className="mb-3">
                <b>Q{i+1} ({q.type}):</b>
                <div dangerouslySetInnerHTML={{__html: q.question}} />
                {q.type === 'mcq' && (
                  <ul>
                    {q.choices.map(c => <li key={c.id}>{c.text}</li>)}
                  </ul>
                )}
                {q.type === 'fitb' && (
                  <div><i>Answer:</i> {q.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topics;
