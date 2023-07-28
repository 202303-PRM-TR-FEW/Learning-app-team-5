import API_KEY from "./gamification-config";

const BASE_URL = 'https://api.gamelayer.co/api/v0';

const makeAuthenticatedRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'api-key': API_KEY,
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
  };

  if (method !== 'GET' && data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  } catch (error) {
    // Handle errors gracefully
    console.error('API Error:', error.message);
    throw new Error('Failed to fetch data from the GameLayer API.');
  }
};

const getLeaderboard = async () => {
    return makeAuthenticatedRequest('/leaderboards');
  };

export default { makeAuthenticatedRequest, getLeaderboard };
