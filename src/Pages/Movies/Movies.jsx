import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieList from "../../components/MoviesComponents/Movies/Movies";
import Spinner from "../../components/Spinner/Spinner";

import { APIKEY } from "../../config";

import "./movies.scss";

const Movies = () => {
  const [loading, isLoading] = useState(false);
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);

  useEffect(
    () => {
      const fetchMovies = async () => await getMovies();
      fetchMovies();
    },
    [page]
  );

  const getMovies = async () => {
    isLoading(true);

    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&page=${page}`
    );
    const data = await resp.json();
    setMovies(data.results);

    isLoading(false);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <div className="movies-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBoxWithSuggestions />

          <MovieList displayNavButtons title="Movies" movieList={movies} />
        </>
      )}
      <div className="pagination-container">
        {page > 1 ? (
          <button className="btn" onClick={prevPage}>
            Prev Page
          </button>
        ) : null}

        <button className="btn" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Movies;
