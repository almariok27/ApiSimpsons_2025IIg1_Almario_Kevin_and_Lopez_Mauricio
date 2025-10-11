import React, { useState } from 'react';
import './Header.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/episodes" onClick={closeMenu}>
                    <img src="src/assets/1.png" alt="Episodios" className="nav-icon" />
                </Link>
                <Link to="/location" onClick={closeMenu}>
                    <img src="src/assets/2.png" alt="Ubicaciones" className="nav-icon" />
                </Link>
                <Link to="/characters" onClick={closeMenu}>
                    <img src="src/assets/3.png" alt="Personajes" className="nav-icon" />
                </Link>
            </div>

            <header>
                <section className="section1">
                    <Link to="/" className="logo-link" onClick={closeMenu}>
                        <img className="logo" src="src/assets/titulo.png" alt="Logo" />
                    </Link>
                </section>

                <section className="nav-section">
                    <nav>
                        <Link to="/episodes">
                            <img src="src/assets/1.png" alt="Episodes" className="nav-icon" />
                        </Link>
                        <Link to="/location">
                            <img src="src/assets/2.png" alt="Personajes" className="nav-icon" />
                        </Link>
                        <Link to="/characters">
                            <img src="src/assets/3.png" alt="Ubicación" className="nav-icon" />
                        </Link>
                    </nav>
                </section>

                <section className="section2">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon sx={{ fontSize: 60, color: '#000' }} />
                    </a>

                    <button
                        className="menu-btn"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        {isMenuOpen ? (
                            <CloseIcon sx={{ fontSize: 40, color: '#000' }} />
                        ) : (
                            <MenuIcon sx={{ fontSize: 40, color: '#000' }} />
                        )}
                    </button>
                </section>
            </header>
        </>
    );
};

export default Header;
