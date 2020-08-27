import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APIKEY } from "../../../config";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.scss";

export default () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => await getNowPlayingMovies();
    fetchMovies();
  }, []);

  const getNowPlayingMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?&api_key=${APIKEY}&language=en-US`
    );
    const nowPlayingMovies = await resp.json();
    setMovies(nowPlayingMovies.results);
  };

  // const base_url = 'https://image.tmdb.org/t/p/w780';
  const base_url = "https://image.tmdb.org/t/p/w1280";
  return (
    <div className="carousel-container">
      <Carousel
        infiniteLoop={true}
        useKeyboardArrows={true}
        showIndicators={false}
      >
        {movies &&
          movies.map((movie) => (
            <div key={movie.id}>
              <img
                className="carousel-img"
                src={base_url + movie.backdrop_path}
                alt="carousel img"
              />
              <Link to={`/movie-info/${movie.id}`} className="legend">
                <p className="movie-title">{movie.title}</p>
                <p className="release-date">
                  Release date: {movie.release_date}
                </p>
              </Link>
            </div>
          ))}
      </Carousel>
    </div>
  );
};
