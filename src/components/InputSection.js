import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const InputSection = ({
  handleResumeChange,
  resumeFiles,
  jobDescription,
  handleJobDescriptionChange,
  handleResumeSubmit,
  isLoading,
  results
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track which file to show results for

  const handleFileChange = (e) => {
    const files = e.target?.files; // Ensure e.target exists
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      handleResumeChange(e); // Pass the event to the parent function
    } else {
      console.error('No files selected');
    }
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].removing = true; // Flag file as removing
    setSelectedFiles(updatedFiles);

    setTimeout(() => {
      const filesAfterRemoval = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(filesAfterRemoval);
    }, 300); // Timeout matches the transition duration (300ms)
  };

  const handleViewScore = (index) => {
    setSelectedIndex(index); // Set the index of the clicked file to show action buttons
  };

  const handleGetScore = async (index) => {
    // Simulate getting the score from the backend
    // Add logic here for submitting the resume for scoring if necessary

    // For this example, just setting a mock result.
    if (!results[index]) {
      const mockResult = {
        score: Math.floor(Math.random() * 5) + 1,
        result: "<h2 class='highlighted'>Resume Evaluation</h2><p>Score: " + (Math.floor(Math.random() * 5) + 1) + "/5</p>"
      };
      results[index] = mockResult; // Assuming results are being stored in the parent component
    }
    setSelectedFiles([...selectedFiles]); // Force re-render with updated results
  };

  return (
    <div className="upload-container">
      <div className="job-description-textarea-wrapper">
        <label htmlFor="job-description" className="job-description-label">Job Description</label>
        <textarea
          id="job-description"
          className="job-description-textarea"
          placeholder="Enter the job description here..."
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          />
      </div>

      <div className="upload-section">
        {/* Custom Upload Button */}
        <label htmlFor="file-upload" className="upload-label">
          <FaUpload className="upload-icon" /> Upload Resume
        </label>
        <input
          type="file"
          id="file-upload"
          name="resume"
          accept=".pdf,.doc,.docx"
          className="upload-input"
          multiple
          onChange={handleFileChange} // Handles file change
          style={{ display: 'none' }} // Hide the default input
        />
        
        {/* Displaying selected files */}
        {selectedFiles.length > 0 && (
          <div className="file-list">
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index} className={`file-item ${file.removing ? 'removing' : ''}`}>
                {/* Wrap the entire li item with a clickable link */}
                <a href={`#resume${index}`} className="file-link">
                  <span>{file.name}</span>
                  {/* Clickable area for checking the ID */}
                </a>
        
                {/* Before score, show "Remove" button */}
                {results && results[index] ? (
                  <div className="resume-actions">
                    {/* Show View Resume and View Score buttons after score is fetched */}
                    <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                      <button className="view-resume-btn">View Resume</button>
                    </a>
                    <button className="view-score-btn" onClick={() => handleGetScore(index)}>
                      View Score
                    </button>
                  </div>
                ) : (
                  // Show Remove button before score is fetched
                  ''
                )}
              </li>
            ))}
          </ul>
        </div>
        
        )}

        {/* Description Section */}
        <div className="description">
          <p>
            Please upload your resume in PDF, DOC, or DOCX format for evaluation.
            <br />
            <br />
            <span>Note:</span> Ensure your resume is clear, concise, and highlights relevant experience.
            <br />
            <br />
            <a href="https://i.ibb.co/P6GGHs4/jobfit-help.webp" target='_blank'>Click here for tips on creating the perfect resume.</a>
          </p>
        </div>
      </div>

      <button
        className="get-score-btn"
        onClick={handleResumeSubmit}
        disabled={isLoading || selectedFiles.length === 0}
      >
        {isLoading ? 'Analyzing...' : 'Get Final Score'}
      </button>
    </div>
  );
};

export default InputSection;
