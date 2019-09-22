import React from "react";

import MovieList from "../../MovieList/MovieList";

import "./movies.scss";

const Movies = ({ movieList, getMovieById }) => {
  return (
    <section className="movie-list">
      <div className="movie-list__wrapper">
        <div className="group">
          <div className="group-item line" />
          <h1 className="title group-item text">Movies</h1>
          <div className="group-item line" />
        </div>
        <MovieList movieList={movieList} getMovieById={getMovieById} />
      </div>
    </section>
  );
};

export default Movies;
