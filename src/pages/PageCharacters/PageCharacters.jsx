import React, { useState, useEffect, useCallback } from "react";
import "./PageCharacters.css";
import Card from "../../components/CardCharacter/CardCharacter";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

const PageCharacters = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const getPageFromUrl = useCallback(() => {
        const params = new URLSearchParams(location.search);
        return parseInt(params.get('page')) || 1;
    }, [location.search]);

    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(getPageFromUrl()); 
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const urlPage = getPageFromUrl();
        if (urlPage !== currentPage) {
            setCurrentPage(urlPage);
        }
    }, [location.search, getPageFromUrl]);

    const handlePageChange = (event, value) => {
        navigate(`/characters?page=${value}`); 
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const url = `https://thesimpsonsapi.com/api/characters?page=${currentPage}`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.error(`Error HTTP: ${response.status}`);
                    setPersonajes([]);

                    return;
                }

                const data = await response.json();
                setPersonajes(data.results || []);

                if (data.info && data.info.pages) {
                    setTotalPages(data.info.pages);
                } else {
                    setTotalPages(50);
                }
            } catch (error) {
                console.error("Error al cargar personajes:", error);
                setPersonajes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [currentPage]); 

    return (
        <main id="main-characters">
            <h1 className="titulo-characters">Characters</h1>
            <div id="contenedorCartas">
                {loading ? (
                    <p className="loading-text">Cargando personajes...</p>
                ) : personajes.length > 0 ? (
                    personajes.map((item, index) => (
                        <Link
                            to={`/character/${item.id}`}
                            state={{ fromPage: currentPage }} 
                            key={item.id || index}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card personajes={item} />
                        </Link>
                    ))
                ) : (
                    <p>No se encontraron personajes. Intenta volver a una página anterior.</p>
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

export default PageCharacters;