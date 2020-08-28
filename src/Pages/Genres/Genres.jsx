import React, { useState, useEffect } from "react";
import MovieList from "../../components/MoviesComponents/Movies/Movies";

import Select from "react-select";
import Spinner from "../../components/Spinner/Spinner";

import "./genres.scss";
import { APIKEY } from "../../config";

const Genres = (props) => {
  const [loading, setLoading] = useState(false);
  const [movieGenres, setMovieGenres] = useState([]);
  const [genre, setGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [id, setID] = useState(null);
  const [totalPages, setSetTotalPages] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { genre_id } = props.match.params;
  const options = [];

  movieGenres.map((i) => options.push({ label: i.name, value: i.id }));

  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true);

        await getGenreById(genre_id);
        await getMovieGenres();

        setLoading(false);
      };
      fetchData();
    },
    [genre_id]
  );

  const nextPage = async () => {
    setLoading(true);

    setPage(page + 1);

    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${APIKEY}&page=${page}&sort_by=popularity.desc&primary_release_year=2018`
    );
    const data = await resp.json();

    const newList = [
      ...data.results.filter((item) => item.poster_path !== null),
    ];
    setGenre(newList);

    setLoading(false);
  };

  const prevPage = async () => {
    setLoading(true);

    if (!totalPages > 1) return false;
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${APIKEY}&page=${page}&sort_by=popularity.desc&primary_release_year=2018`
    );
    setPage(page - 1);
    const data = await resp.json();

    const newList = [
      ...data.results.filter((item) => item.poster_path !== null),
    ];
    setGenre(newList);

    setLoading(false);
  };

  const getMovieGenres = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?&api_key=${APIKEY}&language=en-US`
    );

    const data = await resp.json();
    setMovieGenres(data.genres);
    setLoading(false);
  };

  const getGenreById = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${ID}&api_key=${APIKEY}&sort_by=popularity.desc`
    );

    const data = await resp.json();

    setSetTotalPages(data.total_pages);
    setGenre(data.results);
    setID(ID);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    props.history.push(`/genres/${selectedOption.value}`);
  };

  return (
    <div className="genres-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="genres-container__inner">
            <div className="genres-container__select">
              <Select
                className="select"
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder={"Select a genre..."}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#88d383",
                    neutral20: "green",
                    primary: "green",
                  },
                })}
              />
            </div>
            <MovieList
              displayNavButtons="false"
              title="Genres"
              movieList={genre}
            />
          </div>
        </>
      )}

      <div className="pagination-container">
        {page !== 1 ? (
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

export default Genres;
