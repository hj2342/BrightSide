// src/services/apiService.js

// Base URL for the Quotable API
const baseUrl = 'https://api.quotable.io';

// Mapping of moods to related keywords for more diverse quote searches
const moodToKeywords = {
  happy: ['joy', 'happiness', 'cheerful', 'optimism', 'delight'],
  sad: ['sorrow', 'melancholy', 'grief', 'heartache', 'despair'],
  excited: ['enthusiasm', 'thrill', 'exhilaration', 'passion', 'eagerness'],
  relaxed: ['calm', 'peace', 'tranquility', 'serenity', 'ease'],
  anxious: ['worry', 'fear', 'uncertainty', 'apprehension', 'nervousness'],
  inspired: ['motivation', 'creativity', 'imagination', 'aspiration', 'vision'],
  energetic: ['vigor', 'vitality', 'zest', 'dynamic', 'lively']
};

// Function to fetch a quote based on the user's mood
export const fetchQuoteBasedOnMood = async (mood) => {
  try {
    // Get keywords for the mood, or use the mood itself if not found in the mapping
    const keywords = moodToKeywords[mood.toLowerCase()] || [mood];
    
    // Try each keyword until a quote is found
    for (const keyword of keywords) {
      const response = await fetch(`${baseUrl}/search/quotes?query=${encodeURIComponent(keyword)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Randomly select one quote from the results
        const randomIndex = Math.floor(Math.random() * data.results.length);
        return data.results[randomIndex].content;
      }
    }

    // If no quotes found for any keyword, fetch a random quote
    const randomResponse = await fetch(`${baseUrl}/random`);
    if (!randomResponse.ok) {
      throw new Error(`HTTP error! Status: ${randomResponse.status} - ${randomResponse.statusText}`);
    }
    const randomData = await randomResponse.json();
    return randomData.content;

  } catch (error) {
    console.error("Error fetching the quote:", error.message);
    throw error;
  }
};
// Base URL for the MusicBrainz API
const musicBrainzBaseUrl = 'https://musicbrainz.org/ws/2/';

// Mapping of moods to music tags for searching
const mapMoodToSearchTerms = (mood) => {
  const moodMap = {
    'happy': ['pop', 'dance', 'funk', 'reggae', 'afrobeat', 'disco'],
    'sad': ['indie', 'acoustic', 'blues', 'ballads', 'soft rock'],
    'romantic': ['R&B', 'soul', 'jazz', 'classical', 'latin', 'soft pop'],
    'energetic': ['EDM', 'rock', 'hip-hop', 'house', 'trap'],
    'relaxed': ['chillwave', 'lo-fi', 'ambient', 'bossa nova'],
    'bored': ['chillwave', 'lo-fi', 'ambient', 'house', 'trap'],
    'focused': ['classical', 'lo-fi hip-hop', 'jazz', 'instrumental'],
    'nostalgic': ['80s pop/rock', 'classic rock', 'synthwave'],
    'confident': ['rap', 'pop', 'rock', 'reggaeton'],
    'inspired': ['classical', 'folk', 'indie'],
    'anxious': ['ambient', 'new age'],
    'excited': ['EDM', 'rock', 'hip-hop', 'house', 'trap']
  };
  return moodMap[mood.toLowerCase()] || [mood];
};

// Function to fetch tracks for a specific tag
const fetchTracksForTag = async (tag) => {
  const query = encodeURIComponent(`tag:${tag} AND (video:false) AND (dur:[120000 TO 600000])`);
  const url = `${musicBrainzBaseUrl}recording?query=${query}&fmt=json&limit=10`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'YourAppName/1.0.0 (your@email.com)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.recordings
      .filter(track => 
        track['artist-credit'] && // to check if the song has a defined artist
        track['artist-credit'].length > 0 && 
        track.length && 
        track.length >= 120000 && //to check of the song is of standard length ie.2-10 min
        track.length <= 600000
      )
      .map(track => ({
        id: track.id,
        title: track.title,
        artist: track['artist-credit'][0].name,
        duration: Math.round(track.length / 1000)
      }));
  } catch (error) {
    console.error(`Error fetching tracks for tag ${tag}:`, error.message);
    return [];
  }
};

// Function to fetch music recommendations based on mood
export const fetchMusicRecommendations = async (mood) => {
  try {
    const searchTerms = mapMoodToSearchTerms(mood);
    let allTracks = [];

    for (const term of searchTerms) {
      const tracks = await fetchTracksForTag(term);
      allTracks = allTracks.concat(tracks);
    }

    // Remove duplicates based on id
    const uniqueTracks = Array.from(new Set(allTracks.map(track => track.id)))
      .map(id => allTracks.find(track => track.id === id));

    // Randomly select 3 tracks
    return uniqueTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

  } catch (error) {
    console.error("Error fetching music recommendations:", error.message);
    return [];
  }
};