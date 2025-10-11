import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import './CharacterInfoPage.css';


const URL_BASE_IMAGEN = 'https://cdn.thesimpsonsapi.com/500';

const AparicionCard = ({ tipo, detalle }) => {
    if (!detalle) return null;

    const rutaCompletaImagen = URL_BASE_IMAGEN + detalle.image_path;

    return (
        <div className="aparicion-card">
            <h3>Primera Aparición en {tipo}</h3>
            <img src={rutaCompletaImagen} alt={detalle.name} />
            <div className="aparicion-detalle">
                <h4>{detalle.name}</h4>
                <p>
                    T. {detalle.season}, N° {detalle.episode_number}
                </p>
                <p className="airdate">Fecha: {detalle.airdate}</p>
                <p className="synopsis">{detalle.synopsis.substring(0, 100)}...</p>
            </div>
        </div>
    );
};


const CharacterInfoPage = () => {
    const { id } = useParams();
    const [personaje, setPersonaje] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const fromPage = location.state?.fromPage || 1;

    useEffect(() => {
        fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
            .then(res => res.json())
            .then(data => {
                setPersonaje(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al cargar personaje:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!personaje) return <p>No se encontró el personaje.</p>;

    const rutaCompletaImagen = URL_BASE_IMAGEN + personaje.portrait_path;

    return (
        <main id="main1">
            <div className="card-wrapper">
                <div id="CardInfo">
                    <section id="section1">
                        <article className="Artsection1 info-basica">
                            <div className="containerImg">
                                <img src={rutaCompletaImagen} alt={personaje.name} id="imgp" />
                            </div>
                            <div className="containerInfo">
                                <h1>{personaje.name}</h1>
                                <h2>
                                    {personaje.age} Años,
                                    <span className={`status-tag ${personaje.status === 'Alive' ? 'alive' : 'dead'}`}>
                                        {personaje.status}
                                    </span>
                                </h2>
                                <p className="ocupacion">Ocupación: {personaje.occupation}</p>
                                <p className="genero">Género: {personaje.gender}</p>
                                <p className="nacimiento">Nacimiento: {personaje.birthdate}</p>
                            </div>
                        </article>

                        <article className="Artsection1 descripcion-y-frases">
                            <div className="InfoComplet">
                                <div className="description-container">
                                    <h3>Descripción</h3>
                                    <p>{personaje.description}</p>
                                </div>

                                <div className="phrases-container">
                                    <h3>Frases Famosas</h3>
                                    <div className="phrases-list">
                                        {personaje.phrases && personaje.phrases.map((phrase, index) => (
                                            <span key={index} className="phrase-bubble">"{phrase}"</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>

                    <section id="section2">
                        <h2 className="section-title">Primeras Apariciones</h2>
                        <AparicionCard tipo="Episodio" detalle={personaje.first_appearance_ep} />
                        <AparicionCard tipo="Corto" detalle={personaje.first_appearance_sh} />
                    </section>
                </div>

                <button
                    className="btn-volver"
                    onClick={() => navigate(`/characters?page=${fromPage}`)}
                >
                    ⬅️ Volver a la página {fromPage}
                </button>
            </div>
        </main>
    );
};

export default CharacterInfoPage;