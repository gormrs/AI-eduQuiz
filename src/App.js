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
        console.log(response.data.quiz);
        const formattedQuiz = JSON.parse(response.data.quiz);
        setQuiz(formattedQuiz);
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log(error.response);
    }
};

  
  
  return (
    <div className="">
      <h1 className="text-3xl font-bold underline">
        Text Summarizer and Quiz Generator
      </h1>
      <textarea value={text} onChange={handleChange} rows="10" cols="50" />
      <button onClick={handleSubmit}>Submit</button>
      <h2>Summary</h2>
      <p>{summary}</p>
      <h2>Quiz</h2>
    <ol>
      {quiz.map((questionObj, index) => (
        <li key={index}>
          <h3>{questionObj.question}</h3>
          <ol type="A">
            {questionObj.choices.map((choice, cIndex) => (
              <li key={cIndex}>{choice.text}</li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  </div>
  );
}

export default App;
