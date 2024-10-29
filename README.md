
# BrightSide: Mood-Based Music and Quote Recommender

## Table of Contents
1. Introduction
2. Getting Started
   - Prerequisites
   - Installation
3. Features
4. Usage
   - Selecting a Mood
   - Viewing Recommendations
5. API Integration
   - MusicBrainz API
   - Quotable API
   - Pexels API
6. Components
   - MoodSelector
   - SuggestionDisplay
   - MusicRecommendations
7. Services
   - apiService
   - pexelsService
8. Troubleshooting
9. Contributing
10. License

Now, let's start filling in some of these sections:

## 1. Introduction

BrightSide is a web application that provides music and quote recommendations based on the user's current mood. It integrates with the MusicBrainz API for music recommendations, the Quotable API for inspirational quotes, and the Pexels API for mood-related images.

## 2. Getting Started

### Prerequisites
- Node.js (version X.X.X or higher)
- npm (version X.X.X or higher)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/brightside.git
   ```
2. Navigate to the project directory:
   ```
   cd brightside
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## 3. Features
- Mood-based music recommendations
- Inspirational quotes based on mood
- Dynamic background images reflecting the selected mood
- User-friendly interface for mood selection

## 4. Usage

### Selecting a Mood
Users can select their current mood from a predefined list or enter a custom mood.

### Viewing Recommendations
After selecting a mood, the application displays:
- A relevant quote
- Three music recommendations
- A background image reflecting the mood

## 5. API Integration

### MusicBrainz API
BrightSide uses the MusicBrainz API to fetch music recommendations. The application searches for recordings based on tags associated with the selected mood.

Key points:
- Base URL: https://musicbrainz.org/ws/2/
- Search endpoint: `/recording`
- Query parameters:
  - `query`: Encoded search terms (e.g., `tag:pop AND (video:false) AND (dur:[120000 TO 600000])`)
  - `fmt`: json
  - `limit`: 3 (per tag)

For more details on the MusicBrainz API, refer to their [official documentation](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2).

Certainly! Let's continue with the documentation for your BrightSide project. We'll pick up where we left off and add more details to the sections we started earlier.

## 5. API Integration (continued)

### Quotable API
BrightSide uses the Quotable API to fetch inspirational quotes based on the user's mood.

Key points:
- Base URL: https://api.quotable.io
- Endpoints used:
  - `/search/quotes`: To search for quotes based on mood keywords
  - `/random`: To fetch a random quote if no mood-specific quote is found

For more details on the Quotable API, refer to their [official documentation](https://github.com/lukePeavey/quotable).

### Pexels API
The Pexels API is used to fetch mood-related background images for the application.

Key points:
- Base URL: https://api.pexels.com/v1
- Endpoint used: `/search`
- Query parameters:
  - `query`: The mood or related keywords
  - `per_page`: Number of images to fetch (we use 15)
  - `orientation`: Set to 'landscape' for wallpapers

Note: Remember to keep your Pexels API key secure and not expose it in client-side code.

For more information, consult the [Pexels API documentation](https://www.pexels.com/api/documentation/).

## 6. Components

### MoodSelector
The MoodSelector component allows users to select their current mood. It includes both predefined mood buttons and a custom input field.

Key features:
- Predefined mood buttons for quick selection
- Custom mood input for flexibility
- Triggers mood-based content updates on selection

### SuggestionDisplay
This component displays the mood-based quote fetched from the Quotable API.

Key features:
- Renders the fetched quote
- Handles loading and error states

### MusicRecommendations
The MusicRecommendations component displays the music tracks recommended based on the selected mood.

Key features:
- Lists up to three recommended tracks
- Shows track title and artist for each recommendation
- Handles cases where no recommendations are found

## 7. Services

### apiService
The apiService handles all API calls to MusicBrainz and Quotable APIs.

Key functions:
- `fetchQuoteBasedOnMood(mood)`: Fetches a quote based on the given mood
- `fetchMusicRecommendations(mood)`: Retrieves music recommendations for the selected mood

### pexelsService
This service manages interactions with the Pexels API for fetching mood-related images.

Key functions:
- `fetchMoodImage(mood)`: Fetches a random image related to the given mood
- `fetchWallpaper(query)`: Retrieves a landscape image to be used as a wallpaper

## 8. Troubleshooting

Common issues and their solutions:
- CORS errors when fetching from MusicBrainz API: Implement a server-side proxy or use a CORS proxy for development
- Rate limiting: Implement proper error handling and user feedback for API rate limit errors
- No results for certain moods: Expand the mood-to-keyword mappings or implement fallback options

## 9. Contributing

Guidelines for contributing to the project:
1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with clear, concise commit messages
4. Push your changes to your fork
5. Submit a pull request with a description of your changes

## 10.AI-Generated Code Credit

This project was developed with the assistance of AI, specifically OpenAI's language model. The following components and functions were generated or significantly influenced by AI:

1. `MoodSelector` component: The initial structure and logic were AI-generated, with subsequent manual adjustments.

2. `fetchMusicRecommendations` function in `apiService.js`: The core logic for fetching and processing music recommendations was AI-assisted.

3. `fetchQuoteBasedOnMood` function in `apiService.js`: The implementation of mood-based quote fetching was guided by AI suggestions.

4. CSS styling in `App.css` and `MoodSelector.css`: The initial CSS structure and some specific styles were AI-generated, with manual customization.

5. Error handling and CORS issue resolution: AI provided guidance on addressing these technical challenges.

While AI played a significant role in the development process, all code was reviewed, tested, and adjusted by the developer to ensure functionality, security, and adherence to best practices.


