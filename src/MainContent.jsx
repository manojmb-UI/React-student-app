import React from 'react'

// components/MainContent.jsx
function MainContent({ isOpen }) {
  return (
    <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`}>
      <h2>Main Content</h2>
      <p>Your page content goes here.</p>
    </div>
  );
}

export default MainContent;
