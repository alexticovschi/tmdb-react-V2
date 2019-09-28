import React from "react";
import MovieList from "../../MovieList/MovieList";

import "./similarMovies.scss";

const SimilarMovies = ({ movieList, getMovieById }) => {
  return (
    <section className="similar-movies-container">
      {movieList.length > 0 ? (
        <>
          <div className="group">
            <div className="group-item line"></div>
            <h1 className="title group-item text">Similar Movies</h1>
            <div className="group-item line"></div>
          </div>

          <div className="similar-movies-container__similar-movies">
            <MovieList movieList={movieList} getMovieById={getMovieById} />
          </div>
        </>
      ) : null}
    </section>
  );
};

export default SimilarMovies;
