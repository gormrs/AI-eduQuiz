import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api.php", { text });
      setSummary(response.data.summary);
      setQuiz(response.data.quiz);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Text Summarizer and Quiz Generator</h1>
      <textarea value={text} onChange={handleChange} rows="10" cols="50" />
      <button onClick={handleSubmit}>Submit</button>
      <h2>Summary</h2>
      <p>{summary}</p>
      <h2>Quiz</h2>
      <ol>
        {quiz.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
