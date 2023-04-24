import { useState } from "react";

function Quiz({ quiz }) {
  const [userAnswers, setUserAnswers] = useState({});

  function handleChoiceSelection(questionIndex, choiceIndex) {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: choiceIndex,
    });
  }

  function handleSubmit() {
    let correctAnswersCount = 0;

    quiz.forEach((questionObj, questionIndex) => {
      const userAnswerIndex = userAnswers[questionIndex];
      if (questionObj.choices[userAnswerIndex]?.correct) {
        correctAnswersCount++;
      }
    });

    alert(`You got ${correctAnswersCount} out of ${quiz.length} correct.`);
  }

  return (
    <div className="mb-8 bg-gray-900 px-4 py-4 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      <ol>
        {quiz.map((questionObj, index) => (
          <li key={index}>
            <h3 className="mt-4 mb-2 text-xl font-semibold">
              {questionObj.question}
            </h3>
            <ol type="A" className="quiz-question">
              {questionObj.choices.map((choice, cIndex) => (
                <li
                  key={cIndex}
                  className={`mb-1 cursor-pointer p-2 rounded ${userAnswers[index] === cIndex ? "bg-blue-500" : "bg-gray-800"
                    } hover:bg-gray-700`}
                  onClick={() => handleChoiceSelection(index, cIndex)}
                >
                  {choice.text}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <button
        className="bg-blue-600 py-2 px-4 mt-4"
        onClick={handleSubmit}
      >
        Svar
      </button>
    </div>
  );
}

export default Quiz;