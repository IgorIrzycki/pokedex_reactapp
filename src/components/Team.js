import React, { useState } from 'react';
import '../styles/Team.css';
import menuIcon from '../assets/menu-icon.png'; // Ikonka trzech kropek (ścieżka do pliku obrazka)

const Team = ({ team, onEdit, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    setMenuVisible(false);
    onEdit(team);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    onDelete(team);
  };

  return (
    <div className="team">
      <div className="team-header">
        <h2 className="team-title">{team.teamName}</h2>
        <img
          src={menuIcon}
          alt="Menu"
          className="menu-icon"
          onClick={toggleMenu}
        />
        {menuVisible && (
          <div className="menu-dropdown">
            <button onClick={handleEdit}>Edit Team</button>
            <button onClick={handleDelete}>Delete Team</button>
          </div>
        )}
      </div>
      <div className="pokemon-grid">
        {team.pokemonNames.map((pokemonName, index) => (
          <div key={index} className="pokemon-item">
            <img
              src={team.pokemonSprites[index]}
              alt={pokemonName}
              className="pokemon-sprite"
            />
            <p className="pokemon-name">{pokemonName}</p>
          </div>
        ))}
        {Array.from({ length: 6 - team.pokemonNames.length }).map((_, index) => (
          <div key={`empty-${index}`} className="pokemon-item empty"></div>
        ))}
      </div>
    </div>
  );
};

export default Team;
