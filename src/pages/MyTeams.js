import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from '../components/Team';
import '../styles/MyTeams.css';

const MyTeams = () => {
  const [user, setUser] = useState(null); // Przechowywanie użytkownika
  const [teams, setTeams] = useState([]); // Przechowywanie drużyn użytkownika
  const [currentPage, setCurrentPage] = useState(1); // Obecna strona
  const [teamsPerPage] = useState(1); // Liczba drużyn na stronę
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
        const response = await axios.get(`http://localhost:8080/api/v1/users/${userData.username}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        setUser(response.data);
        setTeams(response.data.teamIds || []);
      } catch (error) {
        console.error('Error fetching user or teams:', error);
        setErrorMessage('Failed to fetch your teams. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  // Obliczanie zakresu drużyn na obecnej stronie
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  // Zmiana strony
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Obsługa edycji drużyny
  const handleEditTeam = (team) => {
    console.log('Edit team:', team);
    // Tutaj możesz zaimplementować logikę otwierania formularza edycji
  };

  // Obsługa usuwania drużyny
  const handleDeleteTeam = async (team) => {
    console.log('Delete team:', team);
  
    try {
      const storedData = localStorage.getItem('user');
      const userData = JSON.parse(storedData);
  
      // Wywołanie endpointu do usunięcia drużyny po nazwie
      await axios.delete(`http://localhost:8080/api/v1/teams/name/${team.teamName}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
  
      // Aktualizacja listy drużyn po usunięciu
      setTeams((prevTeams) => prevTeams.filter((t) => t.teamName !== team.teamName));
    } catch (error) {
      console.error('Error deleting team:', error);
      setErrorMessage('Failed to delete the team. Please try again.');
    }
  };
  

  return (
    <div className="my-teams-container">
      <h1>My Teams</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Renderowanie drużyn na obecnej stronie */}
      {currentTeams.length === 0 ? (
        <p>You haven't created any teams yet.</p>
      ) : (
        <ul className="teams-list">
          {currentTeams.map((team) => (
            <li key={team.id} className="team-item">
              <Team
                team={team}
                onEdit={handleEditTeam}
                onDelete={handleDeleteTeam}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Paginacja */}
      {teams.length > teamsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(teams.length / teamsPerPage) }).map((_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeams;
