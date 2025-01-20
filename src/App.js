import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [resumeFiles, setResumeFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    const rootElement = document.getElementById('root');
    console.log('rootElement: ', rootElement);
    const newTheme = !darkMode ? 'dark' : 'light';
    rootElement.setAttribute('data-theme', newTheme);
    setDarkMode(!darkMode);
    // toast.info(`Switched to ${newTheme} Mode!`, { autoClose: 1000 });
  };


  const handleResumeChange = (e) => {
    const files = e.target.files; // Access files from the event
    const filesArray = Array.from(files); // Convert FileList to an array
    setResumeFiles(filesArray); // Update the state with the selected files
  };


  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleResumeSubmit = async () => {
    if (resumeFiles.length === 0) {
      toast.error('Please select at least one resume to upload', { autoClose: 3000 });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    resumeFiles.forEach((file) => {
      formData.append('resume', file);
    });
    formData.append('jd', jobDescription);
    formData.append('actionType', 'submit_score');

    try {
      const response = await fetch('https://resumeranker-ai.onrender.com/api/get-resume-score-ai', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.data);
        toast.success('Scores are ready!', { autoClose: 3000 });
      } else {
        toast.error(data.message || 'Error fetching results', { autoClose: 5000 });
      }
    } catch (error) {
      toast.error('An error occurred while fetching the results', { autoClose: 5000 });
    }

    setIsLoading(false);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`} data-theme={darkMode ? 'dark' : 'light'}>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="container">
        {/* Left Section - Upload */}
        <div className="input-section">
          <div className="logo">
            <span className="logo-icon">
              <i className="fas fa-briefcase"></i>
            </span>
            <span className="logo-text">JobFit.AI</span>
          </div>
          <h2>Analyze resumes and rank them based on the job description</h2>
          <InputSection
            jobDescription={jobDescription}
            handleJobDescriptionChange={handleJobDescriptionChange}
            handleResumeChange={handleResumeChange}
            handleResumeSubmit={handleResumeSubmit}
            resumeFiles={resumeFiles}
            isLoading={isLoading}
          />
        </div>

        {/* Right Section - Results */}
        <div className="result-section">
          <ResultSection results={results} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
