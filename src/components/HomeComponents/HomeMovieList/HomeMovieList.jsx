import React from "react";

import MovieList from "../../MovieList/MovieList";

import "./homeMovieList.scss";

const HomeMovieList = ({ latestMovies, getMovieById }) => {
  return (
    <section className="home-movie-list">
      <div className="home-movie-list__wrapper">
        <div className="group">
          <div className="group-item line" />
          <h1 className="title group-item text">Latest Movies</h1>
          <div className="group-item line" />
        </div>
        <MovieList movieList={latestMovies} getMovieById={getMovieById} />
      </div>
    </section>
  );
};

export default HomeMovieList;
