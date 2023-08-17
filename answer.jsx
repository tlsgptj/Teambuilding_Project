import React from 'react';

const Answer = ({ selectedOption, onNext }) => {
  const handleNextClick = () => {
    onNext(selectedOption);
  };

  return (
    <div className="answer-container">
      <p>You selected: {selectedOption}</p>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default Answer;
