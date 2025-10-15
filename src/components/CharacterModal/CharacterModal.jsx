import React, { useEffect, useState } from 'react';
import './CharacterModal.css';

const URL_BASE_IMAGEN = 'https://cdn.thesimpsonsapi.com/500';

const AparicionCard = ({ tipo, detalle }) => {
    if (!detalle) return null;

    const rutaCompletaImagen = URL_BASE_IMAGEN + detalle.image_path;

    return (
        <div className="characterModal-aparicion-card">
            <h3>Primera Aparición en {tipo}</h3>
            <img src={rutaCompletaImagen} alt={detalle.name} />
            <div className="characterModal-aparicion-detalle">
                <h4>{detalle.name}</h4>
                <p>
                    T. {detalle.season}, N° {detalle.episode_number}
                </p>
                <p className="airdate">Fecha: {detalle.airdate}</p>
                <p className="synopsis">{detalle.synopsis?.substring(0, 100)}...</p>
            </div>
        </div>
    );
};

const CharacterModal = ({ characterId, isOpen, onClose }) => {
    const [personaje, setPersonaje] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && characterId) {
            setLoading(true);
            fetch(`https://thesimpsonsapi.com/api/characters/${characterId}`)
                .then(res => res.json())
                .then(data => {
                    setPersonaje(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error al cargar personaje:', err);
                    setLoading(false);
                });
        }
    }, [characterId, isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (loading) {
        return (
            <div className="characterModal-backdrop" onClick={handleBackdropClick}>
                <div className="characterModal-content">
                    <p className="characterModal-loading">Cargando...</p>
                </div>
            </div>
        );
    }

    if (!personaje) {
        return (
            <div className="characterModal-backdrop" onClick={handleBackdropClick}>
                <div className="characterModal-content">
                    <p className="characterModal-error">No se encontró el personaje.</p>
                    <button className="characterModal-close" onClick={onClose}>✕</button>
                </div>
            </div>
        );
    }

    const rutaCompletaImagen = URL_BASE_IMAGEN + personaje.portrait_path;

    return (
        <div className="characterModal-backdrop" onClick={handleBackdropClick}>
            <div className="characterModal-content">
                <button className="characterModal-close" onClick={onClose} title="Cerrar">
                    ✕
                </button>
                
                <div className="characterModal-card-info">
                    <section className="characterModal-section1">
                        <article className="characterModal-info-basica">
                            <div className="characterModal-img">
                                <img src={rutaCompletaImagen} alt={personaje.name} />
                            </div>
                            <div className="characterModal-info">
                                <h1>{personaje.name}</h1>
                                <h2>
                                    {personaje.age} Años,
                                    <span className={`characterModal-status ${personaje.status === 'Alive' ? 'alive' : 'dead'}`}>
                                        {personaje.status}
                                    </span>
                                </h2>
                                <p>Ocupación: {personaje.occupation}</p>
                                <p>Género: {personaje.gender}</p>
                                <p>Nacimiento: {personaje.birthdate}</p>
                            </div>
                        </article>

                        <article>
                            <div className="characterModal-description">
                                <h3>Descripción</h3>
                                <p>{personaje.description}</p>
                            </div>

                            <div className="characterModal-phrases">
                                <h3>Frases Famosas</h3>
                                <div className="characterModal-phrases-list">
                                    {personaje.phrases && personaje.phrases.map((phrase, index) => (
                                        <span key={index} className="characterModal-phrase">"{phrase}"</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </section>

                    <section className="characterModal-section2">
                        <h2 className="characterModal-section-title">Primeras Apariciones</h2>
                        <AparicionCard tipo="Episodio" detalle={personaje.first_appearance_ep} />
                        <AparicionCard tipo="Corto" detalle={personaje.first_appearance_sh} />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CharacterModal;
