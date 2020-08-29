import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieList from "../../components/MoviesComponents/Movies/Movies";
import Spinner from "../../components/Spinner/Spinner";

import { APIKEY } from "../../config";

import "./topRatedMovies.scss";

const TopRatedMovies = () => {
  const [loading, setLoading] = useState(false);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(
    () => {
      const fetchData = async () => await getTopRatedMovies();
      fetchData();
    },
    [page]
  );

  const getTopRatedMovies = async () => {
    setLoading(true);

    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US&page=${page}`
    );
    const topRatedMovies = await resp.json();
    setTopRatedMovies(topRatedMovies.results);

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
            title="Top Rated Movies"
            movieList={topRatedMovies}
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

export default TopRatedMovies;
