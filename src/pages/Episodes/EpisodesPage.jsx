import React, { useState, useEffect } from 'react';
import './EpisodesPage.css';
import CardsEpisodes from '../../components/CardsEpidoes/CardsEpisodes';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const EpisodesPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const maxPages = 5;

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://thesimpsonsapi.com/api/episodes?page=${currentPage}`);

                if (!response.ok) throw new Error('Error al cargar los episodios');

                const data = await response.json();
                setEpisodes(data.results || []);

                if (data.info && data.info.pages) {
                    setTotalPages(Math.min(data.info.pages, maxPages));
                } else if (data.next || data.previous) {
                    const nextUrl = data.next;
                    if (nextUrl) {
                        const nextPage = parseInt(nextUrl.split('page=')[1]);
                        setTotalPages(Math.min(nextPage, maxPages));
                    }
                } else {
                    setTotalPages(1);
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [currentPage]);

    if (loading) {
        return (
            <div id='episodes'>
                <div className="loading-container">
                    <h2>Cargando episodios...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div id='episodes'>
                <div className="error-container">
                    <h2>Error: {error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div id='episodes'>
            <h1 className="titulo-characters">Episodes</h1>
            <div className="episodes-container">
                {episodes.map((episode) => (
                    <CardsEpisodes key={episode.id} episode={episode} />
                ))}
            </div>

            {!loading && (
                <Stack
                    spacing={2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '30px 0',
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
        </div>
    );
};

export default EpisodesPage;
