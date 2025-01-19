import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Pokedex.css';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = response.data.results;

        const pokemonData = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );

        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    const filteredByType = type
      ? pokemons.filter(
          (pokemon) =>
            pokemon.types.map((type) => type.type.name).includes(type.toLowerCase())
        )
      : pokemons;

    const filteredByName = searchTerm
      ? filteredByType.filter(
          (pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : filteredByType;

    setFilteredPokemons(filteredByName);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    const filteredByName = term
      ? pokemons.filter(
          (pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase())
        )
      : pokemons;

    const filteredByType = typeFilter
      ? filteredByName.filter(
          (pokemon) =>
            pokemon.types.map((type) => type.type.name).includes(typeFilter.toLowerCase())
        )
      : filteredByName;

    setFilteredPokemons(filteredByType);
  };

  const handlePokemonClick = async (pokemon) => {
    try {
      const detailsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
      const speciesData = detailsResponse.data;

      const englishDescription = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );

      const selectedDescription = englishDescription
        ? englishDescription.flavor_text
        : speciesData.flavor_text_entries[0].flavor_text;

      setSelectedPokemon({
        ...pokemon,
        description: selectedDescription,
        stats: pokemon.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      });
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const getPokemonBackgroundColor = (types) => {
    const colors = {
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
    };

    const typeName = types && types[0]?.type?.name ? types[0].type.name : null;

    return typeName ? colors[typeName] || '#fff' : '#fff';
  };

  return (
    <div className="pokedex-container">
      <h1>Pokedex</h1>
      <div>
        <label>
          Filter by Type:
          <select
            value={typeFilter}
            onChange={(e) => handleTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Search by Name:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="pokedex-grid">
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-tile"
            style={{ backgroundColor: getPokemonBackgroundColor(pokemon.types) }}
            onClick={() => handlePokemonClick(pokemon)}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="pokemon-details">
          <h3>{selectedPokemon.name}</h3>
          <p>{selectedPokemon.description}</p>
          <h4>Stats:</h4>
          <ul>
            {selectedPokemon.stats.map((stat) => (
              <li key={stat.name}>
                {stat.name}: {stat.value}
              </li>
            ))}
          </ul>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
