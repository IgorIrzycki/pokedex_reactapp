import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from '../components/Team'; // Zdefiniuj komponent Team, który będzie renderować dane drużyny
import '../styles/MyTeams.css';

const MyTeams = () => {
  const [teams, setTeams] = useState([]);  // Przechowywanie drużyn użytkownika
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = localStorage.getItem('user');
      const userData = JSON.parse(storedData);

      if (!userData) {
        setErrorMessage('You need to log in first.');
        return;
      }

      try {
        // Pobieramy dane użytkownika z backendu
        const response = await axios.get(`http://localhost:8080/api/v1/users/${userData.username}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,  // Wysłanie tokenu JWT w nagłówku
          },
        });
        setTeams(response.data.teamIds || []);  // Zapisujemy drużyny użytkownika
      } catch (error) {
        console.error('Error fetching user or teams:', error);
        setErrorMessage('Failed to fetch your teams. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="my-teams-container">
      <h1>My Teams</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Sprawdzamy, czy drużyny są dostępne i renderujemy je */}
      {teams.length === 0 ? (
        <p>You haven't created any teams yet.</p>
      ) : (
        <ul className="teams-list">
          {teams.map((team) => (
            <li key={team.id} className="team-item">
              <Team team={team} />  {/* Komponent renderujący drużynę */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTeams;
