import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestionsPerson/SearchBoxWithSuggestions";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PeopleList from "../../components/PeopleList/PeopleList";
import { APIKEY } from "../../config";
import "./People.scss";

const People = (props) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setSetTotalPages] = useState(0);

  useEffect(
    () => {
      getPopularPeople();
    },
    [page]
  );

  const getPopularPeople = async () => {
    setLoading(true);
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/popular?&api_key=${APIKEY}&language=en-US&page=${page}`
    );

    const data = await resp.json();
    setPeople(data.results);
    setLoading(false);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <div className="people-page">
      {loading ? (
        <div className="loader-container">
          <Loader type="Oval" color="#fff" width={60} height={60} />
        </div>
      ) : (
        <>
          <SearchBoxWithSuggestions />

          <PeopleList people={people} />
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

export default People;
