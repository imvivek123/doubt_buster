import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth"; // Import getAuth function from Firebase Auth
import "./QuestionForum.css";
import Navbar from './navbar';
import { Link } from "react-router-dom";

const db = getDatabase();

const SeeAll = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Initialize Firebase Auth
  
  useEffect(() => {
    const questionsRef = ref(db, 'Questions');
    onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const questionsList = Object.entries(data).map(([id, question]) => ({ id, ...question }));
        const filteredQuestions = questionsList.filter((question) => question.userEmail === auth.currentUser.email); // Filter questions by userEmail
        setQuestions(filteredQuestions);
      }
      setLoading(false);
    });
  }, [auth]);

  return (
    <div>
      <Navbar />
      <span className='question-page-title'>Posted Questions</span>
      <div className=''>
        {questions.map((question) => (
          <div key={question.id} className='single-question'>
            <p><div className='individual-qs-title'>Qs.</div> {question.query}</p>
            <p><div className='individual-qs-title'>Asked by:</div> {question.userEmail}</p>
            <div className='tags-div'><div className='individual-qs-title'>Tags.</div>{question.tags && question.tags.join(", ")}</div>
            <Link to={`/Answers/${question.id}`}>
              <button className="Answers-btn" >Answers</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeAll;
