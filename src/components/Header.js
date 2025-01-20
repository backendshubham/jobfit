import React from 'react';

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <div className="header">
      <button 
        className={`toggle-btn ${!darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} 
        onClick={toggleTheme}
      >
        {darkMode ? (
          <i className="fas fa-sun" title="Switch to Light Mode"></i>
        ) : (
          <i className="fas fa-moon" title="Switch to Dark Mode"></i>
        )}
      </button>
    </div>
  );
};

export default Header;
