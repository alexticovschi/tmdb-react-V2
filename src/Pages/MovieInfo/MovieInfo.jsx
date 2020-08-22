import React, { Component } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieData from "../../components/MovieInfoComponents/MovieData/MovieData";
import MovieOverview from "../../components/MovieInfoComponents/MovieOverview/MovieOverview";
import MovieInfoBar from "../../components/MovieInfoComponents/MovieInfoBar/MovieInfoBar";
import MovieCredits from "../../components/MovieInfoComponents/MovieCredits/MovieCredits";
import Recommendations from "../../components/Recommendations/Recommendations";
import SimilarMovies from "../../components/MovieInfoComponents/SimilarMovies/SimilarMovies";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { APIKEY } from "../../config";

import "./movieInfo.scss";

class MovieInfo extends Component {
  state = {
    loading: true,
    movie: [],
    credits: [],
    similarMovies: [],
    movieRecommendations: [],
    trailers: [],

    modalIsOpen: false,
  };

  componentDidMount() {
    const { movie_id } = this.props.match.params;
    this.getMovieById(movie_id);
    this.getSimilarMovies(movie_id);
    this.getMovieCredits(movie_id);
    this.getMovieRecommendations(movie_id);
    this.getTrailers(movie_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { movie_id } = this.props.match.params;
      this.getMovieById(movie_id);
      this.getSimilarMovies(movie_id);
      this.getMovieCredits(movie_id);
      this.getMovieRecommendations(movie_id);
      this.getTrailers(movie_id);
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  getMovieById = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`
    );
    const movie = await resp.json();
    this.setState({ movie });
  };

  getSimilarMovies = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const movies = await resp.json();
    this.setState({ similarMovies: movies.results });
  };

  getMovieCredits = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/credits?&api_key=${APIKEY}&language=en-US`
    );
    const credits = await resp.json();
    this.setState({ credits: credits.cast });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  getMovieRecommendations = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/recommendations?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const movieRecommendations = await resp.json();
    this.setState({ movieRecommendations: movieRecommendations.results });
  };

  getTrailers = async (ID) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/videos?&api_key=${APIKEY}&language=en-US`
    );
    const trailers = await resp.json();
    this.setState({ trailers: trailers.results });
  };

  render() {
    const { movie, movieRecommendations, similarMovies, credits } = this.state;
    const base_url = "https://image.tmdb.org/t/p/w500";
    const base_url2 = "https://image.tmdb.org/t/p/w1400_and_h450_face";
    const genres = movie.genres;

    return (
      <div className="movie-info-container">
        {this.state.loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#fff" width={60} height={60} />
          </div>
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
                getMovieById={this.getMovieById}
              />
            ) : null}
          </>
        )}
      </div>
    );
  }
}

export default MovieInfo;
