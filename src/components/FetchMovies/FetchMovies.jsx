import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieList from "../../components/MoviesComponents/Movies/Movies";
import Spinner from "../../components/Spinner/Spinner";

import { APIKEY } from "../../config";

import "./fetchMovies.scss";

const FetchMovies = ({ pageTitle, slug }) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(
    () => {
      const fetchData = async () => await getMovies();
      fetchData();
    },
    [page]
  );

  const getMovies = async () => {
    setLoading(true);

    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${slug}?&api_key=${APIKEY}&language=en-US&page=${page}`
    );
    const data = await resp.json();
    setMovies(data.results);

    setLoading(false);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <section className="fetch-movies-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBoxWithSuggestions />

          <MovieList displayNavButtons title={pageTitle} movieList={movies} />
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

export default FetchMovies;
