import React, { useState } from 'react';

const Question = ({ question, options, onNext }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    onNext(selectedOption);
  };

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default Question;
