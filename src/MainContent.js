import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import Summary from './Summary';
import Quiz from './Quiz';

function MainContent() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api.php', {
        text,
      });
      setSummary(response.data.summary);
      const formattedQuiz = JSON.parse(response.data.quiz);
      setQuiz(formattedQuiz);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Noe gikk galt. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 px-4 py-8">
      {errorMessage && (
        <div className="mb-4 bg-red-600 p-2 rounded-md text-white">
          {errorMessage}
        </div>
      )}
      <InputForm
        text={text}
        setText={setText}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <Summary summary={summary} />
      <Quiz quiz={quiz} />
    </main>
  );
}

export default MainContent;
