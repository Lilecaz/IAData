import React from 'react';
import '../styles/Header.css';
import logo from '../favicon.png'; // Assure-toi que le chemin correspond à ton projet

const Header = () => {
    return (
        <header className="header-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Prédiction de Prêt</h1>
            </div>
            <nav className="nav-links">
            </nav>
        </header>
    );
};

export default Header;
