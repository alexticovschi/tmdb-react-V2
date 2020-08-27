import React, { useState, useEffect } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import Carousel from "../../components/HomeComponents/Carousel/Carousel";
import HomeMovieList from "../../components/HomeComponents/HomeMovieList/HomeMovieList";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { APIKEY } from "../../config";

import "./home.scss";

const Home = () => {
  const [state, setState] = useState({
    loading: true,
    latestMovies: [],
  });

  const { loading, latestMovies } = state;

  useEffect(() => {
    const fetchData = async () => await getLatestMovies();
    fetchData();
  }, []);

  const getLatestMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    const latestMovies = await resp.json();
    setState({ latestMovies: latestMovies.results });
  };
  return (
    <div className="home-container">
      {loading ? (
        <div className="loader-container">
          <Loader type="Oval" color="#fff" width={60} height={60} />
        </div>
      ) : (
        <>
          <SearchBoxWithSuggestions />
          <Carousel />
          <HomeMovieList latestMovies={latestMovies} />
        </>
      )}
    </div>
  );
};

export default Home;
