import React from 'react';

const Header = ({ toggleTheme }) => {
  return (
    <div className="header">
      <button className="toggle-btn" onClick={toggleTheme}>
        Switch to Dark Mode
      </button>
    </div>
  );
};

export default Header;
