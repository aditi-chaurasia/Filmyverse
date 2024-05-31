import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './MovieDetail.css';
import { motion } from "framer-motion";

function MovieDetails() {
    const [currentMovieDetail, setMovieDetail] = useState();
    const { id } = useParams();

    const fetchData = async () => {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e2abee6c8ed2414f5b23970f331d7cd8`);
        let data = await response.json();
        setMovieDetail(data);
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <>
            <div className='movie'>
                {currentMovieDetail && (
                    <div className="movie__intro">
                        <img
                            className="movie__backdrop"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`}
                            alt={currentMovieDetail.title}
                            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>
            <div className='xyz'>
                <div className='movie__detail'>
                    <div className="movie__detailLeft">
                        <div className='movie__posterBox'>
                            {currentMovieDetail && (
                                <motion.img
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        delay: 2.9,
                                        x: { type: "spring", stiffness: 60 },
                                        opacity: { duration: 1 },
                                        ease: "easeIn",
                                        duration: 1,
                                    }}
                                    className="movie__poster"
                                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`}
                                    alt={currentMovieDetail.title}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className='motion'>
                    <div className="movie__detailRight">
                        <div className="movie__detailRightTop">
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 1.7,
                                    x: { type: "spring", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1,
                                }}
                                className="movie__name"
                            >
                                {currentMovieDetail ? currentMovieDetail.original_title : ""}
                            </motion.div>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 2,
                                    x: { type: "spring", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1,
                                }}
                                className="movie__tagline"
                            >
                                {currentMovieDetail ? currentMovieDetail.tagline : ""}
                            </motion.div>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 2.3,
                                    x: { type: "spring", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1,
                                }}
                                className="movie__rating"
                            >
                                {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                                <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                            </motion.div>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 2.5,
                                    x: { type: "spring", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeOut",
                                    duration: 1,
                                }}
                                className="movie__runtime"
                            >
                                {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
                            </motion.div>
                        </div>
                        <div className="movie__detailRightBottom">
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 2.7,
                                    x: { type: "spring", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1,
                                }}
                            >
                                {currentMovieDetail ? currentMovieDetail.overview : ""}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieDetails;
