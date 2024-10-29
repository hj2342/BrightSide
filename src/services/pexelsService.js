// src/services/pexelsService.js

// API key for Pexels, stored in an environment variable for security
const PEXELS_API_KEY = process.env.PEXELS_API_KEY 
// Base URL for the Pexels API search endpoint
const PEXELS_API_URL = 'https://api.pexels.com/v1/search';

// Function to fetch a mood-related image
export const fetchMoodImage = async (mood) => {
  try {
    // Fetch 15 images related to the mood
    const response = await fetch(`${PEXELS_API_URL}?query=${encodeURIComponent(mood)}&per_page=15`, {
      headers: {
        'Authorization': PEXELS_API_KEY // Include API key in request headers
      }
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if photos are returned
    if (data.photos && data.photos.length > 0) {
      // Log the number of photos (seems to be a typo in the original code)
      console.log(response.length5)
      // Select a random image from the results
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      return data.photos[randomIndex].src.medium || null;
    } else {
      console.log("No images found for the given mood");
      return null;
    }
  } catch (error) {
    console.error("Error fetching mood image:", error.message);
    return null;
  }
};

// Function to fetch a wallpaper image
export const fetchWallpaper = async (query = 'nature') => {
  try {
    // Fetch 15 landscape-oriented images related to the query
    const response = await fetch(`${PEXELS_API_URL}?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`, {
      headers: {
        'Authorization': PEXELS_API_KEY // Include API key in request headers
      }
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if photos are returned
    if (data.photos && data.photos.length > 0) {
      // Log the number of photos (seems to be a typo in the original code)
      console.log(response.length5)
      // Select a random image from the results
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      return data.photos[randomIndex].src.medium || null;
    } else {
      console.log("No images found for the given mood");
      return null;
    }
  } catch (error) {
    console.error("Error fetching wallpaper:", error.message);
    return null;
  }
};