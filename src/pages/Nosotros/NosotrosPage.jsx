import React from 'react'
import './NosotrosPage.css'
import mauricio from '../../assets/Mauricio.jpg'
import kevin from '../../assets/Kevin.png'

const Nosotros = () => {
    return (
        <div id="equipo-desarrollo" className="seccion-equipo">
            <h2 className="titulo-equipo">Equipo de Desarrollo</h2>
            <div className="tarjetas-container">
                <div className="tarjeta-flip">
                    <div className="tarjeta-flip-inner">
                        <div className="tarjeta-flip-front">
                            <img src={mauricio} alt="López Mauricio" className="imagen-creador" />
                        </div>
                        <div className="tarjeta-flip-back">
                            <h3>López Mauricio</h3>
                            <p>Desarrollador Frontend</p>
                            <p>
                                Especialista en React y diseño de interfaces. Apasionado por crear
                                experiencias de usuario únicas inspiradas en el mundo de Los Simpsons.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="tarjeta-flip">
                    <div className="tarjeta-flip-inner">
                        <div className="tarjeta-flip-front">
                            <img src={kevin} alt="Kevin Almario" className="imagen-creador" />
                        </div>
                        <div className="tarjeta-flip-back">
                            <h3>Kevin Almario</h3>
                            <p>Diseñador Gráfico</p>
                            <p>
                                Encargado del diseño visual y la experiencia de usuario. Experto en
                                crear interfaces atractivas que capturan la esencia de Springfield.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nosotros
