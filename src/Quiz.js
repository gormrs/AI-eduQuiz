import React from "react";

function Quiz({ quiz }) {
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
                  <li key={cIndex} className="mb-1">
                    {choice.text}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    );
  }

export default Quiz;
  