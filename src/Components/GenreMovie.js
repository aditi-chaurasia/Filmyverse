import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './App.css';
import Caraousel from './Caraousel/Caraousel';

const API_KEY = "e2abee6c8ed2414f5b23970f331d7cd8";
const API_GENRE_MOVIES = `https://api.themoviedb.org/3/discover/movie`;

function GenreMovies() {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMoviesByGenre();
    }, [genreId]);

    const fetchMoviesByGenre = async () => {
        try {
            const response = await axios.get(`${API_GENRE_MOVIES}?api_key=${API_KEY}&with_genres=${genreId}`);
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (<>   
     <Caraousel/>

        <div className="main"> 
            <div className="main2">
                {movies.map((movie) => (
                    <Card 
                        key={movie.id} 
                        border="danger" 
                        style={{ width: '15rem', margin: '10px', cursor: 'pointer' }} 
                        onClick={() => handleCardClick(movie.id)}
                    >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} height="240rem" />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div></>
    );
}

export default GenreMovies;
