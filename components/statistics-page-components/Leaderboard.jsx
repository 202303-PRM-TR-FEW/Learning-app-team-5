// Achievements.js
import React, { useEffect, useState } from 'react';
import { makeAuthenticatedRequest } from '../../api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      // Retrieve achievements data from the API
      const achievementsResponse = await makeAuthenticatedRequest('/achievements');
      setAchievements(achievementsResponse);
    } catch (error) {
      // Handle error
      console.error('Error fetching achievements data:', error.message);
    }
  };

  return (
    <div>
      <h1>Achievements</h1>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            <img src={achievement.imgUrl} alt={achievement.name} />
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
