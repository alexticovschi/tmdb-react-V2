import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieList from "../../components/MoviesComponents/Movies/Movies";
import Spinner from "../../components/Spinner/Spinner";

import { APIKEY } from "../../config";

import "./movies.scss";

const Movies = () => {
  const [loading, isLoading] = useState(false);
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchMovies = async () => await getMovies();
    fetchMovies();
  }, []);

  const getMovies = async () => {
    isLoading(true);

    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&sort_by=popularity.desc`
    );
    const data = await resp.json();
    setMovies(data.results);

    isLoading(false);
  };

  const loadMoreMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&page=${page}`
    );
    const data = await resp.json();
    setPage(page + 1);
    const newList = [...movies, ...data.results];
    setMovies(newList);
  };

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
      <div className="loadmore-container">
        <button className="btn" onClick={loadMoreMovies}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default Movies;
