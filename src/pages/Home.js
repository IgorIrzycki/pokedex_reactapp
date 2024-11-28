import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Our Pokemon App!</h2>

      <p className="bold-text">
        Explore the fascinating world of Pokemon and catch them all on our platform.
      </p>

      <p className="italic-text">
        Join our community of trainers and embark on a journey to become the ultimate Pokemon Master.
      </p>

      <p className="underline-text">
        Discover rare and powerful Pokemon to build your dream team and participate in epic battles.
      </p>

      <p className="highlighted-text">
        Share your experiences and reviews with other trainers to help them on their Pokemon adventures.
      </p>

      <p className="custom-styled-text">
        Customize your teams, create strategies, and compete with other trainers in exciting tournaments.
      </p>
    </div>
  );
};

export default Home;
