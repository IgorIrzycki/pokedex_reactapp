import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateTeam.css';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const CreateTeam = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              types: details.data.types.map((type) => type.type.name),
            };
          })
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handlePokemonSelect = (pokemon) => {
    if (selectedPokemon.length >= 6) {
      setErrorMessage('Your team can have at most 6 Pokémon.');
      return;
    }

    setErrorMessage('');
    setSelectedPokemon([...selectedPokemon, pokemon]);
  };

  const handleRemovePokemon = (index) => {
    setSelectedPokemon(selectedPokemon.filter((_, i) => i !== index));
  };

  const handleSaveTeam = async () => {
    if (!teamName.trim()) {
      setErrorMessage('Please enter a team name.');
      return;
    }
  
    if (selectedPokemon.length === 0) {
      setErrorMessage('A team must have at least 1 Pokémon.');
      return;
    }
  
    try {
      const userdata = JSON.parse(localStorage.getItem('user')); // Pobierz dane użytkownika z localStorage
      const token = userdata.token;
      console.log("JWT Token: ", token);
      if (!token) {
        setErrorMessage('You are not authorized. Please log in again.');
        return;
      }
  
      const spritesPromises = selectedPokemon.map(async (pokemon) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        return response.data.sprites.front_default;
      });
  
      const pokemonSprites = await Promise.all(spritesPromises);
  
      // Tworzymy obiekt z danymi drużyny
      const teamData = {
        teamName,
        pokemonNames: selectedPokemon.map((pokemon) => pokemon.name),
        pokemonSprites,
        userName: userdata.username, // Można użyć userName z userdata, jeśli jest zapisane
      };
  
      await axios.post(
        'http://localhost:8080/api/v1/teams',
        teamData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Dodaj token JWT do nagłówka
          },
        }
      );
  
      alert('Team saved successfully!');
      setTeamName('');
      setSelectedPokemon([]);
    } catch (error) {
      console.error('Error saving team:', error);
      setErrorMessage('Failed to save team. Please try again.');
    }
  };
  

  return (
    <div className="create-team-container">
      <h1>Create Your Pokémon Team</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <input
        type="text"
        placeholder="Enter team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="team-name-input"
      />

      <h2>Selected Pokémon</h2>
      <ul className="selected-pokemon-list">
        {selectedPokemon.map((pokemon, index) => (
          <li key={index} className="selected-pokemon-item">
            <span>{pokemon.name}</span>
            <button onClick={() => handleRemovePokemon(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <button
        className="save-button"
        onClick={handleSaveTeam}
        disabled={!teamName || selectedPokemon.length === 0}
      >
        Save Team
      </button>

      <h2>Available Pokémon</h2>
      <ul className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.name}
            className="pokemon-item"
            style={{
              background: pokemon.types
                .map((type) => typeColors[type])
                .join(', '),
              backgroundImage:
                pokemon.types.length > 1
                  ? `linear-gradient(to right, ${typeColors[pokemon.types[0]]}, ${typeColors[pokemon.types[1]]})`
                  : '',
            }}
            onClick={() => handlePokemonSelect(pokemon)}
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTeam;
