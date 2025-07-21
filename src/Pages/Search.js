import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, child } from 'firebase/database';
import Navbar from "./navbar";
import "./Search.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Tags = () => {
  const [tag, setTag] = useState('');
  const [pushIds, setPushIds] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (tag) {
      const db = getDatabase();
      const tagsRef = ref(db, `Tags/${tag}`);
      const questionsRef = ref(db, 'Questions');

      onValue(tagsRef, (snapshot) => {
        const pushIds = [];
        snapshot.forEach((childSnapshot) => {
          
          const value = childSnapshot.val();
          if (value === true) {
            pushIds.push({ id: childSnapshot.key, userEmail: value });
          }
        });
        setPushIds(pushIds);

        Promise.all(
          pushIds.map((pushId) =>
            new Promise((resolve) => {
              const queryRef = child(questionsRef, `${pushId.id}`);
              onValue(queryRef, (snapshot) => {
                const query = snapshot.val();
                const question = { ...query, id: pushId.id }; // set the id property to pushId.id
                resolve(question);
              });
            })
          )
        ).then((questions) => {
          setQuestions(questions);
        });
      });
    }
  }, [tag]);

  const handleTagChange = (e) => {
    setTag(e.target.value);
    setPushIds([]);
    setQuestions([]);
  }
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setTag(tagParam);
    }
  }, [location]);


  return (
    <div>
      <Navbar />
      <div className='Tag-question-wrapper'>
        <div className='tag-question-title'>Search Questions with Tags</div>
      
        <select value={tag} onChange={handleTagChange}>
          <option value="">Select a tag</option>
          <option value="CS Course">CS Course</option>
          <option value="Chemistry">Chemistry</option>
          <option value="MAL Course">MAL Course</option>
          <option value="EE Course">EE Course</option>
        </select>
        {/* <div className='single-ans'> */}
          {questions.length > 0 ? (
            <div>
              <span className='tag-question-title2'>Questions for {tag}:</span>
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
          ) : (
            <div>No questions found</div>
          )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Tags;
