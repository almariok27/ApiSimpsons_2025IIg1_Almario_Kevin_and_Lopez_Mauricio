import React, { useState, useEffect } from "react";
import "./LocationsPage.css";
import CardLocations from "../../components/CardLocations/CardLocations";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PageLocations = () => {
    const [lugares, setLugares] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const url = `https://thesimpsonsapi.com/api/locations?page=${currentPage}`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.error(`Error HTTP: ${response.status}`);
                    setLugares([]);
                    return;
                }

                const data = await response.json();
                setLugares(data.results || []);

                if (data.info && data.info.pages) {
                    setTotalPages(data.info.pages);
                } else if (data.next || data.previous) {
                    const nextUrl = data.next;
                    if (nextUrl) {
                        const nextPage = parseInt(nextUrl.split("page=")[1]);
                        setTotalPages(nextPage); 
                    }
                }
            } catch (error) {
                console.error("Error al cargar lugares:", error);
                setLugares([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [currentPage]);

    return (
        <main id="main-locations">
            <h1 className="titulo-locations">Places of Springfield</h1>

            <div id="contenedor-lugares">
                {loading ? (
                    <p className="loading-text">Cargando lugares...</p>
                ) : lugares.length > 0 ? (
                    lugares.map((lugar, index) => (
                        <CardLocations lugar={lugar} key={lugar.id || index} />
                    ))
                ) : (
                    <p>No se encontraron lugares. Intenta volver a una página anterior.</p>
                )}
            </div>

            {!loading && (
                <Stack
                    spacing={2}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "30px 0",
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </Stack>
            )}
        </main>
    );
};

export default PageLocations;
