import React from 'react';
import { FadeLoader } from 'react-spinners';

function InputForm({ text, setText, handleSubmit, loading }) {
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="mb-8 bg-gray-900 px-4 py-4 rounded-md">
      <label className="block text-sm font-bold mb-2 text-white">
        Skriv inn tekst:
      </label>
      <textarea
        className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 text-white"
        value={text}
        onChange={handleChange}
        rows="10"
        cols="50"
        maxLength="4000"
      />
      <button
        className="bg-blue-600 py-2 px-4 mb-8 relative inline-flex items-center justify-center"
        onClick={handleSubmit}
        disabled={loading}
      >
        <div className="flex items-center space-x-2"> 
          {loading && <FadeLoader size={15} color={'#ffffff'} />}
          <span>{loading ? 'Laster' : 'Send inn'}</span>
        </div>
      </button>
    </div>
  );
}

export default InputForm;