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
          maxLength="2048"
        />
        <button
          className="bg-blue-600 py-2 px-4 mb-8 relative"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <FadeLoader size={15} color={'#ffffff'} /> : 'Send inn'}
        </button>
      </div>
    );
  }

export default InputForm;