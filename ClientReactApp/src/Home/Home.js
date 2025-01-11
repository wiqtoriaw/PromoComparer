import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <><div className="home-container">
      <h1>Projekt zespołowy - Strona Główna</h1>
    </div>
    <Link to="/promotions/top">Największe Promocje</Link></>
  );
};

export default Home;
