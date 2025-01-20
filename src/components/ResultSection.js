import React from 'react';

const ResultSection = ({ results }) => {
  return (
    <div className="result-list">
      {results.length === 0 ? (
        <p>No results available. Please upload resumes and submit.</p>
      ) : (
        results.map((result, index) => (
          <div
            key={index}
            id={`resume${index}`}
            className="result-item"
          >
            <h3>{result.name}</h3>
            <div className="result-content" dangerouslySetInnerHTML={{ __html: result.result }} />
          </div>
        ))
      )}
    </div>
  );
};

export default ResultSection;
