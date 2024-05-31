import React, { useEffect, useState } from "react";
import "./Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  const [movies, setMovies] = useState([]);
  const [hideIndicators, setHideIndicators] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?include_video=true&api_key=e2abee6c8ed2414f5b23970f331d7cd8");
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Check window width on component mount
    handleWindowResize();
    // Add event listener for window resize
    window.addEventListener('resize', handleWindowResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleWindowResize = () => {
    // Check window width and update state to hide indicators if width <= 500
    if (window.innerWidth <= 500) {
      setHideIndicators(true);
    } else {
      setHideIndicators(false);
    }
  };

  return (
    <div className="poster">
      <Carousel
        showThumbs={false} // Hide thumbnails
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={!hideIndicators} // Show indicators if hideIndicators is false
      >
        {movies.map(ele => (
          <Link
            key={ele.id}
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${ele.id}`}
          >
            <div className="posterImage">
              <img src={`https://image.tmdb.org/t/p/original${ele?.backdrop_path}`} alt={ele?.original_title} />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">{ele?.original_title}</div>
              <div className="posterImage__runtime">
                {ele?.release_date}
                <span className="posterImage__rating">{ele?.vote_average}<i className="fas fa-star" /></span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
