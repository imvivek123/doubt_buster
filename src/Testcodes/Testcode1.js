import { useState, useEffect } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo } from 'firebase/database';

function MyComponent({ userEmail }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const questionsRef = ref(database, 'Questions');
    const userQuestionsQuery = query(questionsRef, orderByChild('userEmail'), equalTo(userEmail));

    const fetchQuestions = async () => {
      try {
        const snapshot = await get(userQuestionsQuery);
        const questionsData = snapshot.val();
        if (questionsData) {
          const questionsArray = Object.entries(questionsData).map(([key, value]) => {
            return {
              id: key,
              ...value,
            };
          });
          setQuestions(questionsArray);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (userEmail) {
      fetchQuestions();
    }
  }, [userEmail]);

  return (
    <div>
      {questions.map(question => (
        <div key={question.id}>
          <h2>{question.query}</h2>
          <p>{question.answer}</p>
        </div>
      ))}
    </div>
  );
}
