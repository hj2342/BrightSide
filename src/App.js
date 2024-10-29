// src/App.js

import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import SuggestionDisplay from './components/SuggestionDisplay';
import { fetchQuoteBasedOnMood, fetchMusicRecommendations } from './services/apiService';
import { fetchWallpaper } from './services/pexelsService';
import './App.css';

const App = () => {
  // State variables for mood, quote, music recommendations, and wallpaper
  const [mood, setMood] = useState("");
  const [quote, setQuote] = useState("");
  const [musicRecommendations, setMusicRecommendations] = useState([]);
  const [wallpaper, setWallpaper] = useState(null);

  // Effect hook to fetch a default wallpaper when the component mounts
  useEffect(() => {
    fetchWallpaper().then(setWallpaper);
  }, []);

  // Function to handle mood changes
  const handleMoodChange = async (selectedMood) => {
    setMood(selectedMood);

    try {
      // Fetch quote based on mood
      const fetchedQuote = await fetchQuoteBasedOnMood(selectedMood);
      setQuote(fetchedQuote);

      // Fetch music recommendations based on mood
      const tracks = await fetchMusicRecommendations(selectedMood);
      setMusicRecommendations(tracks);

      // Fetch wallpaper based on mood
      const wallpaperUrl = await fetchWallpaper(selectedMood);
      setWallpaper(wallpaperUrl);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    // Main app container with dynamic background
    <div className="app" style={{
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      {/* Content container with semi-transparent background */}
      <div className="content" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px'
      }}>
        <h1 className="main-title">BrightSide</h1>
        {/* Mood selector component */}
        <MoodSelector setMood={handleMoodChange} />
        {/* Quote display component */}
        <SuggestionDisplay suggestion={quote} mood={mood} />
        {/* Music recommendations section */}
        <div>
          <h3>Recommended Music:</h3>
          {musicRecommendations.length > 0 ? (
            <ul>
              {musicRecommendations.map(track => (
                <li key={track.id}>
                  "{track.title}" by {track.artist}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recommendations found for this mood.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;