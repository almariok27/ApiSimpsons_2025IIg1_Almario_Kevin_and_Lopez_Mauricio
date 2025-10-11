import React from "react";
import "./CardLocations.css";

const CardLocations = ({ lugar }) => {

    const Urlimage = `https://cdn.thesimpsonsapi.com/1280${lugar.image_path}`;
    
    return (
        <div class="simpsons-card">
            <div class="card-header">
                <h1 class="simpsons-title">THE SIMPSONS</h1>
                <div class="info-line">
                    <span class="id">ID: {lugar.id}</span>
                    <span class="location-label">{lugar.name}</span>
                    <div class="symbol-badge">☢️</div>
                </div>  
            </div>

            <div class="card-image">
                <img src={Urlimage}alt={lugar.name} class="location-img" />
            </div>

            <div class="card-footer">
                <p class="town-use">
                    <span class="label">TOWN:</span> {lugar.town}
                </p>
                <p class="town-use">
                    <span class="label">USE:</span> {lugar.use}
                </p>
            </div>
        </div>
    )

};

export default CardLocations;
