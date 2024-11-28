import React from 'react';
import '../styles/Team.css';

const Team = ({ team }) => {
  return (
    <div className="team">
      <h2>{team.teamName}</h2>
      <ul>
        {team.pokemonNames.map((pokemonName, index) => (
          <li key={index}>
            <img
              src={team.pokemonSprites[index]}
              alt={pokemonName}
              width="50"
              height="50"
            />
            {pokemonName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
