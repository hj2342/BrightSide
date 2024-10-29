// src/components/SuggestionDisplay.js

import React from 'react';

// SuggestionDisplay component that takes suggestion and mood as props
const SuggestionDisplay = ({ suggestion, mood }) => {
  // If no mood is selected, render nothing
  if (!mood) return null;

  return (
    <div className="suggestion-display">
      <h2>Today's Suggestion</h2>
      {/* Display the suggestion if available, otherwise show a loading message */}
      <p>{suggestion || "Loading your suggestion..."}</p>
    </div>
  );
};

export default SuggestionDisplay;