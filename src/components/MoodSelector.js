// src/components/MoodSelector.js

import React, { useState } from 'react';
import './MoodSelector.css'; 

// MoodSelector component that takes setMood function as a prop
const MoodSelector = ({ setMood }) => {
  // State to manage the input mood entered by the user
  const [inputMood, setInputMood] = useState('');
  
  // Array of predefined moods for quick selection
  const predefinedMoods = ['Happy', 'Sad', 'Excited', 'Relaxed', 'Anxious', 'Energetic'];

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputMood.trim()) {
      setMood(inputMood);
      setInputMood(''); // Clear the input after submission
    }
  };

  // Function to handle selection of a predefined mood
  const handlePredefinedMood = (mood) => {
    setMood(mood);
    setInputMood(''); // Clear the input when a predefined mood is selected
  };

  return (
    <div className="mood-selector">
      <h2>How are you feeling today?</h2>
      {/* Display buttons for predefined moods */}
      <div className="predefined-moods">
        {predefinedMoods.map((mood) => (
          <button 
            key={mood} 
            onClick={() => handlePredefinedMood(mood)}
            className="mood-button"
          >
            {mood}
          </button>
        ))}
      </div>
      {/* Form for custom mood input */}
      <form onSubmit={handleSubmit} className="custom-mood-form">
        <input 
          type="text" 
          value={inputMood}
          onChange={(e) => setInputMood(e.target.value)}
          placeholder="Or enter your own mood..."
          className="mood-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default MoodSelector;