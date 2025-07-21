import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "./navbar";
import "./Answers.css";
const db = getDatabase();

const Answers = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [userReply, setUserReply] = useState("");

  const getUserData = (event) => {
    const { value } = event.target;
    setUserReply(value);
  };

  const addReply = () => {
    if (userReply !== "") {
      const newAnswers = [...answers, userReply];
      const questionRef = ref(db, `Questions/${questionId}`);
      update(questionRef, { answers: newAnswers });
      setAnswers(newAnswers);
      setUserReply("");
    }
    else{
      alert("Empty fields are not allowed!")
    }
  };

  useEffect(() => {
    const questionRef = ref(db, `Questions/${questionId}`);
    onValue(questionRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        const { query, tags, userEmail, answers } = data;
        setQuestion({ id: questionId, query, tags, userEmail });
        setAnswers(answers || []);
      }
    });
  }, [questionId]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Navbar/>
    <span className='question-page-title-ans'>Questions with answers</span>
    <div className='single-ans'>
    <p><div className='individual-qs-title-ans'>Qs.</div> {question.query}</p>
    <p><div className="asked-by"><div className='individual-qs-title-ans asked-by '>Asked by:</div> {question.userEmail}</div></p>
    <p><div className='individual-qs-title-ans asked-by'>Tags.</div><span className="tags-div">{question.tags && question.tags.join(", ")}</span></p>

      <span className="answers-heading">Answers:</span>


      {answers.slice(1).map((answer, index) => (
        <div key={index}>
          <FontAwesomeIcon icon={faArrowRight} />
          <span> {answer}</span>
        </div>
      ))}



      <div className="reply-box" id="">
        <textarea className="rep-box"
          type="text"
          placeholder="Type your answer here..."
          value={userReply}
          onChange={getUserData}
        />
        <button  className="reply-button" onClick={addReply}>Reply</button>
      </div>
    </div>
    </div>
  );
};

export default Answers;
