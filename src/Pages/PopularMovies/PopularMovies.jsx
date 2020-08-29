import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieList from "../../components/MoviesComponents/Movies/Movies";
import Spinner from "../../components/Spinner/Spinner";
import { APIKEY } from "../../config";

import "./popularMovies.scss";

const PopularMovies = () => {
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(
    () => {
      const fetchData = async () => await getPopularMovies();
      fetchData();
    },
    [page]
  );

  const getPopularMovies = async () => {
    setLoading(true);

    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/popular?&api_key=${APIKEY}&language=en-US&page=${page}`
    );
    const popularMovies = await resp.json();
    setPopularMovies(popularMovies.results);

    setLoading(false);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <section className="top-rated-movies-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBoxWithSuggestions />

          <MovieList
            displayNavButtons
            title="Popular Movies"
            movieList={popularMovies}
          />
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
    </section>
  );
};

export default PopularMovies;
