import React from "react";

function Summary({ summary }) {
    return (
      <div className="mb-8 bg-gray-900 px-4 py-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Sammendrag</h2>
        <p className="mb-8">{summary}</p>
      </div>
    );
  }

export default Summary;