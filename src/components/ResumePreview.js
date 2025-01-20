import React, { useState, useEffect } from 'react';

const ResumePreview = ({ file }) => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const readFileContent = () => {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result);
      };
      
      if (file.type === 'application/pdf') {
        setFileContent('PDF previews not supported yet.');
      } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFileContent('DOCX previews not supported yet.');
      } else {
        reader.readAsText(file);
      }
    };

    readFileContent();
  }, [file]);

  return (
    <div className="resume-preview">
      <h4>Preview for {file.name}</h4>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default ResumePreview;
