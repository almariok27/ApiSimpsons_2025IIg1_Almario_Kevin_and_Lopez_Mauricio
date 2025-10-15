import './CardCharacter.css';


const CardCharacter = ({ personajes, onClick }) => {
    const URL_BASE_IMAGEN = 'https://cdn.thesimpsonsapi.com/500';
    const rutaCompletaImagen = URL_BASE_IMAGEN + personajes.portrait_path;

    let fraseSeleccionada = "";

    if (personajes.phrases && personajes.phrases.length > 0) {
        const fraseValida = personajes.phrases.find(f => f.length <= 30);
        fraseSeleccionada = fraseValida || personajes.phrases[0];
    }

    const handleCardClick = () => {
        if (onClick) {
            onClick(personajes.id);
        }
    };

    return (
        <div id="card" className="card-clickable" onClick={handleCardClick}>
            <section className="Img-container">
                <div className="container-img">
                    <img src={rutaCompletaImagen} alt={personajes.name} />
                </div>
            </section>

            <section className="Info-container">
                <h1>{personajes.name}</h1>
                <h2>{personajes.occupation}</h2>
                <div>
                    {personajes.age && (
                        <span className="Span1">{personajes.age}</span>
                    )}
                    <span className="Span2">{personajes.status}</span>
                </div>
                <p>"{fraseSeleccionada}"</p>
            </section>
        </div>
    );
};

export default CardCharacter;
