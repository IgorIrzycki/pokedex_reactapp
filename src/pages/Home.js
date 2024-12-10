import React, { useState } from 'react';
import '../styles/Home.css';

const allTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

const typeAdvantages = {
  normal: { strongAgainst: [], weakAgainst: ['Rock', 'Ghost', 'Steel'] },
  fire: { strongAgainst: ['Grass', 'Bug', 'Ice', 'Steel'], weakAgainst: ['Water', 'Rock', 'Fire', 'Dragon'] },
  water: { strongAgainst: ['Fire', 'Ground', 'Rock'], weakAgainst: ['Electric', 'Grass'] },
  electric: { strongAgainst: ['Water', 'Flying'], weakAgainst: ['Ground'] },
  grass: { strongAgainst: ['Water', 'Ground', 'Rock'], weakAgainst: ['Fire', 'Flying', 'Bug', 'Ice'] },
  ice: { strongAgainst: ['Grass', 'Ground', 'Flying', 'Dragon'], weakAgainst: ['Fire', 'Steel', 'Rock', 'Fighting'] },
  fighting: { strongAgainst: ['Normal', 'Rock', 'Steel', 'Ice', 'Dark'], weakAgainst: ['Flying', 'Psychic', 'Fairy'] },
  poison: { strongAgainst: ['Grass', 'Fairy'], weakAgainst: ['Ground', 'Psychic', 'Steel'] },
  ground: { strongAgainst: ['Fire', 'Electric', 'Poison', 'Rock', 'Steel'], weakAgainst: ['Water', 'Grass', 'Ice'] },
  flying: { strongAgainst: ['Grass', 'Fighting', 'Bug'], weakAgainst: ['Electric', 'Ice', 'Rock'] },
  psychic: { strongAgainst: ['Fighting', 'Poison'], weakAgainst: ['Bug', 'Ghost', 'Dark'] },
  bug: { strongAgainst: ['Grass', 'Psychic', 'Dark'], weakAgainst: ['Fire', 'Flying', 'Rock'] },
  rock: { strongAgainst: ['Fire', 'Ice', 'Flying', 'Bug'], weakAgainst: ['Water', 'Grass', 'Steel', 'Fighting'] },
  ghost: { strongAgainst: ['Psychic', 'Ghost'], weakAgainst: ['Dark'] },
  dragon: { strongAgainst: ['Dragon'], weakAgainst: ['Fairy', 'Ice', 'Steel'] },
  dark: { strongAgainst: ['Psychic', 'Ghost'], weakAgainst: ['Fighting', 'Fairy', 'Bug'] },
  steel: { strongAgainst: ['Ice', 'Rock', 'Fairy'], weakAgainst: ['Fire', 'Fighting', 'Ground'] },
  fairy: { strongAgainst: ['Dragon', 'Dark', 'Fighting'], weakAgainst: ['Poison', 'Steel'] },
};

const Home = () => {
  const [selectedType, setSelectedType] = useState('normal');

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="home-container">
      <h2>Welcome to Our Pokemon App!</h2>

      <p className="bold-text">
        Explore the fascinating world of Pokémon and catch them all on our platform.
      </p>

      <section className="guide-section">
        <h3>How to Create Your Pokémon Team</h3>
        <ol>
          <li>Choose a team name that represents you as a trainer.</li>
          <li>Select up to 6 Pokémon from the list of available Pokémon.</li>
          <li>Mix and match different types to balance your team's strengths and weaknesses.</li>
          <li>Save your team and prepare for epic battles!</li>
        </ol>
      </section>

      <section className="type-chart-section">
        <h3>Type Advantages and Weaknesses</h3>
        <p>Select a Pokémon type below to see its strengths and weaknesses.</p>
        <div className="type-buttons">
          {allTypes.map((type) => (
            <button
              key={type}
              className={`type-button ${type}`}
              onClick={() => handleTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="type-details">
          <h4>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Type</h4>
          <p><strong>Strong Against:</strong> {typeAdvantages[selectedType]?.strongAgainst.join(', ') || 'None'}</p>
          <p><strong>Weak Against:</strong> {typeAdvantages[selectedType]?.weakAgainst.join(', ') || 'None'}</p>
        </div>
      </section>

      <p className="italic-text">
        Join our community of trainers and embark on a journey to become the ultimate Pokémon Master.
      </p>

      <p className="custom-styled-text">
        Customize your teams, create strategies, and compete with other trainers in exciting tournaments.
      </p>
    </div>
  );
};

export default Home;
