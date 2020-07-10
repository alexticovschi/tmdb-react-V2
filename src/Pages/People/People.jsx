import React, { useState, useEffect } from 'react';
import SearchBoxWithSuggestions from '../../components/SearchBoxWithSuggestionsPerson/SearchBoxWithSuggestions';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PeopleList from '../../components/PeopleList/PeopleList';
import { APIKEY } from '../../config';
import './People.scss';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    getPopularPeople();
  }, []);

  const getPopularPeople = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/popular?&api_key=${APIKEY}&language=en-US&page=1`
    );

    const data = await resp.json();
    setPeople(data.results);
    setTimeout(() => setLoading(false), 150);
  };

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
    </div>
  );
};

export default People;
