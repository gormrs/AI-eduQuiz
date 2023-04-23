import React, { useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa";
import { FadeLoader} from "react-spinners";
import "./index.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api.php", { text });
      setSummary(response.data.summary);
      console.log(response.data.quiz);
      const formattedQuiz = JSON.parse(response.data.quiz);
      setQuiz(formattedQuiz);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <header className="bg-zinc-900 p-4 flex justify-between">
        <h1 className="text-3xl font-bold">Sammendrag og quiz-generator for ONH</h1>
        <a href="https://github.com/gormrs" target="_blank" rel="noopener noreferrer">
          <FaGithub size={34} />
        </a>
      </header>

      <main className="flex-1 px-4 py-8">
      <div className="mb-8 bg-gray-900 px-4 py-4 rounded-md">
        <label className="block text-sm font-bold mb-2 text-white">Skriv inn tekst:</label>
        <textarea className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 text-white" value={text} onChange={handleChange} rows="10" cols="50" />
        <button className="bg-blue-600 py-2 px-4 mb-8 relative" onClick={handleSubmit} disabled={loading}>
          {loading ? <FadeLoader size={15} color={"#ffffff"} /> : "Send inn"}
        </button>
        </div>
        <div className="mb-8 bg-gray-900 px-4 py-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Sammendrag</h2>
        <p className="mb-8">{summary}</p>
        <h2 className="text-2xl font-bold mb-4">Quiz</h2>
        <ol>
          {quiz.map((questionObj, index) => (
            <li key={index}>
              <h3 className="mt-4 mb-2 text-xl font-semibold">{questionObj.question}</h3>
              <ol type="A" className="quiz-question">
                {questionObj.choices.map((choice, cIndex) => (
                  <li key={cIndex} className="mb-1">{choice.text}</li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
        </div>
      </main>
      <footer className="bg-zinc-900 p-4 flex justify-between items-center">
        <p>© 2023 AI-eduQuiz. </p>
        <p>Created by Gorm R. Sørbye</p>
      </footer>
    </div>
  );
}

export default App;