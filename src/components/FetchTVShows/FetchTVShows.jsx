import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../TVShowsComponents/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";
import TVShowList from "../TVShowsComponents/TVShows/TVShows";
import Spinner from "../Spinner/Spinner";

import { APIKEY } from "../../config";

import "./fetchTVShows.scss";

const FetchTVShows = ({ pageTitle, slug }) => {
  const [loading, setLoading] = useState(false);
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(
    () => {
      const fetchData = async () => await getTVShows();
      fetchData();
    },
    [page]
  );

  const getTVShows = async () => {
    setLoading(true);

    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/${slug}?&api_key=${APIKEY}&sort_by=popularity.desc&language=en-US&page=${page}`
    );
    const data = await resp.json();
    setTotalPages(data.total_pages);
    setTVShows(data.results);
    setLoading(false);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <section className="fetch-tv-shows-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBoxWithSuggestions />

          <TVShowList
            displayNavButtons
            title={pageTitle}
            tvShowList={tvShows}
          />
        </>
      )}

      <div className="pagination-container">
        {page > 1 ? (
          <button className="btn" onClick={prevPage}>
            Prev Page
          </button>
        ) : null}

        {totalPages > page ? (
          <button className="btn" onClick={nextPage}>
            Next Page
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default FetchTVShows;
