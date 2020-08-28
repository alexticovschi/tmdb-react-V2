import React, { useState, useEffect, Component } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieData from "../../components/MovieInfoComponents/MovieData/MovieData";
import MovieOverview from "../../components/MovieInfoComponents/MovieOverview/MovieOverview";
import MovieInfoBar from "../../components/MovieInfoComponents/MovieInfoBar/MovieInfoBar";
import MovieCredits from "../../components/MovieInfoComponents/MovieCredits/MovieCredits";
import Recommendations from "../../components/Recommendations/Recommendations";
import SimilarMovies from "../../components/MovieInfoComponents/SimilarMovies/SimilarMovies";

import Spinner from "../../components/Spinner/Spinner";

import { APIKEY } from "../../config";

import "./movieInfo.scss";

const MovieInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [credits, setCredits] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieRecommendations, setMovieRecommendations] = useState([]);

  const { movie_id } = props.match.params;
  const base_url = "https://image.tmdb.org/t/p/w500";
  const base_url2 = "https://image.tmdb.org/t/p/w1400_and_h450_face";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await getMovieById(movie_id);
      await getSimilarMovies(movie_id);
      await getMovieCredits(movie_id);
      await getMovieRecommendations(movie_id);

      setLoading(false);
    };
    fetchData();
  }, []);

  const getMovieById = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`
    );
    const movie = await resp.json();
    console.log(movie);
    setMovie(movie);
    setGenres(movie.genres);
  };

  const getSimilarMovies = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const movies = await resp.json();
    setSimilarMovies(movies.results);
  };

  const getMovieCredits = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/credits?&api_key=${APIKEY}&language=en-US`
    );
    const credits = await resp.json();
    setCredits(credits.cast);
  };

  const getMovieRecommendations = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/recommendations?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const movieRecommendations = await resp.json();
    setMovieRecommendations(movieRecommendations.results);
  };

  return (
    <div className="movie-info-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SearchBoxWithSuggestions />
          <MovieData
            imgPath1={movie.poster_path}
            imgPath2={movie.backdrop_path}
            base_url1={base_url}
            base_url2={base_url2}
            movie={movie}
            list={genres}
          />

          <MovieOverview overview={movie.overview} />
          <MovieInfoBar
            time={movie.runtime}
            budget={movie.budget}
            revenue={movie.revenue}
          />

          {credits.length > 0 ? <MovieCredits credits={credits} /> : null}

          {movieRecommendations.length > 0 ? (
            <Recommendations
              path="/movie-info"
              recommendations={movieRecommendations}
            />
          ) : null}

          {similarMovies.length > 0 ? (
            <SimilarMovies
              movieList={similarMovies}
              getMovieById={getMovieById}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default MovieInfo;
