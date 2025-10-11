import * as React from 'react';
import { useState } from 'react';
import './CardsEpisodes.css';
import defaultImage from '../../assets/fondoInicio.jpg';

const CardsEpisodes = ({ episode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const baseImageUrl = 'https://cdn.thesimpsonsapi.com/200/episode/';
    const episodeImageUrl = episode?.id ? `${baseImageUrl}${episode.id}.webp` : defaultImage;


    const handleCardClick = () => {
        setIsExpanded(true);
    };
    const handleCloseModal = (e) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    return (
        <>
            <div className="card-episode" onClick={handleCardClick}>
                <div className="card-image-container">
                    <img
                        src={episodeImageUrl}
                        alt={episode?.name || 'Episode'}
                        className="card-image"
                    />
                </div>
                <div className="card-content">
                    <h2 className="card-title">{episode?.name || 'Episodio sin nombre'}</h2>
                    <p className="card-info">
                        <strong className="parte-titles">Temporada:</strong> {episode?.season || 'N/A'}
                    </p>
                    <p className="card-info">
                        <strong className="parte-titles">Episodio:</strong> {episode?.episode_number || 'N/A'}
                    </p>
                    <p className="card-info">
                        <strong className="parte-titles">Fecha de emisión:</strong> {episode?.airdate || 'N/A'}
                    </p>
                </div>
            </div>
            {isExpanded && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div
                            className="modal-background-image"
                            style={{
                                backgroundImage: `url(${episodeImageUrl})`,
                            }}
                        ></div>
                        <div className="modal-content-overlay"></div>
                        <button className="close-button" onClick={handleCloseModal}>
                            ✕
                        </button>
                        <div className="modal-content-wrapper">
                            <div className="modal-header-new">
                                <h1 className="modal-title-new">{episode?.name || 'Episodio sin nombre'}</h1>
                                <div className="modal-badges">
                                    <span className="badge-season">Season: {episode?.season || 'N/A'}</span>
                                    <span className="badge-episode">Episode: {episode?.episode_number || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="modal-info-grid">
                                <div className="info-card">
                                    <div className="info-content">
                                        <h4>Fecha de Emisión -</h4>
                                        <p>{episode?.airdate || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-synopsis">
                                <h3 className="synopsis-title">Sinopsis</h3>
                                <div className="synopsis-content">
                                    <p>{episode?.synopsis || 'No hay sinopsis disponible para este episodio.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardsEpisodes;