import React from "react";

import MovieList from "../MovieList/MovieList";
import Fade from "react-reveal/Fade";

import "./movies.scss";

const Movies = ({ movieList, getMovieById, title }) => {
  console.log(title);
  return (
    <section className="movie-list">
      <div className="movie-list__wrapper">
        <div className="group">
          <div className="group-item line" />
          <Fade>
            <h1 className="title group-item text">{title}</h1>
          </Fade>
          <div className="group-item line" />
        </div>
        <MovieList movieList={movieList} getMovieById={getMovieById} />
      </div>
    </section>
  );
};

export default Movies;
