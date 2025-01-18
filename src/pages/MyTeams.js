import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from '../components/Team';
import '../styles/MyTeams.css';

const MyTeams = () => {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingTeam, setEditingTeam] = useState(null);
  const [editedTeamName, setEditedTeamName] = useState('');
  const [editedPokemonNames, setEditedPokemonNames] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

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
          headers: { Authorization: `Bearer ${userData.token}` },
        });
        console.log(response.data)
        //setUser(response.data);
        setTeams(response.data.teams || []);
      } catch (error) {
        console.error('Error fetching user or teams:', error);
        setErrorMessage('Failed to fetch your teams. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  const handleEditTeam = (team) => {
    setEditingTeam(team);
    setEditedTeamName(team.teamName);
    setEditedPokemonNames(team.pokemonNames);

    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => setPokemonList(response.data.results))
      .catch((error) => {
        console.error('Error fetching Pokémon list:', error);
        setErrorMessage('Failed to load Pokémon list.');
      });
  };

  const handleSaveTeam = async () => {
    if (!editedTeamName.trim()) {
      setErrorMessage('Please enter a team name.');
      return;
    }

    if (editedPokemonNames.length === 0) {
      setErrorMessage('A team must have at least 1 Pokémon.');
      return;
    }

    try {
      const storedData = localStorage.getItem('user');
      const userData = JSON.parse(storedData);

      if (!userData || !userData.token) {
        setErrorMessage('You are not authorized. Please log in again.');
        return;
      }

      const token = userData.token;

      // Pobierz obrazki Pokémonów
      const spritesPromises = editedPokemonNames.map(async (pokemonName) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data.sprites.front_default;
      });

      const pokemonSprites = await Promise.all(spritesPromises);

      // Zaktualizowane dane drużyny
      const updatedTeam = {
        teamName: editedTeamName,
        pokemonNames: editedPokemonNames,
        pokemonSprites,
      };

      // Wysłanie żądania aktualizacji do API
      await axios.put(
        `http://localhost:8080/api/v1/teams/${editingTeam.id}`,
        updatedTeam,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Aktualizacja drużyny w stanie
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === editingTeam.id ? { ...team, ...updatedTeam } : team
        )
      );
      setEditingTeam(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving team:', error);
      setErrorMessage('Failed to save team. Please try again.');
    }
  };

  const handleDeleteTeam = async (team) => {
    try {
      const storedData = localStorage.getItem('user');
      const userData = JSON.parse(storedData);
  
      await axios.delete(
        `http://localhost:8080/api/v1/teams/${team.id}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
  
      setTeams((prevTeams) =>
        prevTeams.filter((t) => t.id !== team.id)
      );
    } catch (error) {
      console.error('Error deleting team:', error);
      setErrorMessage('Failed to delete team. Please try again.');
    }
  };
  

  const handlePokemonChange = (index, newPokemonName) => {
    const updatedPokemonNames = [...editedPokemonNames];
    updatedPokemonNames[index] = newPokemonName;
    setEditedPokemonNames(updatedPokemonNames);
  };

  const handleRemovePokemon = (index) => {
    const updatedPokemonNames = [...editedPokemonNames];
    updatedPokemonNames.splice(index, 1);
    setEditedPokemonNames(updatedPokemonNames);
  };

  const handleAddPokemon = (index, newPokemonName) => {
    const updatedPokemonNames = [...editedPokemonNames];
    updatedPokemonNames[index] = newPokemonName;
    setEditedPokemonNames(updatedPokemonNames);
  };

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="my-teams-container">
      {!editingTeam && <h1>My Teams</h1>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {editingTeam ? (
        <div className="edit-team-form">
          <h2>Edit Team</h2>
          <label>
            Team Name:
            <input
              type="text"
              value={editedTeamName}
              onChange={(e) => setEditedTeamName(e.target.value)}
            />
          </label>

          <h3>Edit Pokémon</h3>
          <div className="pokemon-edit-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="pokemon-edit-slot">
                <p>Slot {index + 1}</p>
                {editedPokemonNames[index] ? (
                  <div className="pokemon-item">
                    <p>{editedPokemonNames[index]}</p>
                    <select
                      onChange={(e) => handlePokemonChange(index, e.target.value)}
                      value={editedPokemonNames[index]}
                    >
                      {pokemonList.map((pokemon) => (
                        <option key={pokemon.name} value={pokemon.name}>
                          {pokemon.name}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => handleRemovePokemon(index)}>Remove</button>
                  </div>
                ) : (
                  <div className="pokemon-add-item">
                    <select
                      onChange={(e) => handleAddPokemon(index, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Select a Pokémon</option>
                      {pokemonList
                        .map((pokemon) => (
                          <option key={pokemon.name} value={pokemon.name}>
                            {pokemon.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={handleSaveTeam}>Save Changes</button>
          <button onClick={() => setEditingTeam(null)}>Cancel</button>
        </div>
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

      {teams.length > teamsPerPage && !editingTeam && (
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
