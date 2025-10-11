import React from 'react';
import './InicioPage.css';
import imagen from '../../assets/familiaAndCloud.png';
import imagenResponsive from '../../assets/imagenResponsive.png';

const InicioPage = () => {
    const scrollToTeam = () => {
        document.getElementById('equipo-desarrollo').scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <div id="inicio">
            <div className="contenedor-inicio">

                <div className="contenido">
                    <div className="texto-inicio">
                        <h1 className="titulo-principal">¡Bienvenido a Springfield!</h1>
                        <p className="subtitulo">
                            Bienvenido al mundo yellow
                            <br />
                            Tu aventura comienza aquí
                        </p>
                        <button className="boton-equipo" onClick={scrollToTeam}>
                            inicia el recorrido
                        </button>
                    </div>
                    <div className="imagen-inicio">
                        <img src={imagen} alt="Foto de Los Simpsons" id="imagen-simpsons" className="imagen-desktop" />
                        <img src={imagenResponsive} alt="Foto de Los Simpsons Responsive" id="imagen-responsive" className="imagen-responsive" />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default InicioPage
