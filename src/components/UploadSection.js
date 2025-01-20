import React from 'react';

const UploadSection = ({ handleResumeChange, resumeFiles }) => {
  return (
    <div className="section upload-section">
      <img src="https://cdn-icons-png.flaticon.com/512/109/109612.png" alt="Upload Icon" />
      <p>Click to upload resumes or drag and drop here</p>
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        multiple
        onChange={handleResumeChange}
      />
      <div className="resume-list">
        {resumeFiles.length > 0 && resumeFiles.map((file, index) => (
          <div key={index} className="resume-item">
            <span className="file-name">{file.name}</span>
            <button className="view-btn" onClick={() => alert(`Previewing ${file.name}`)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadSection;
