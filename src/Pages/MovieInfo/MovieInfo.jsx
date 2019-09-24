import React, { Component } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieData from "../../components/MovieInfoComponents/MovieData/MovieData";
import Banner from "../../components/MovieInfoComponents/Banner/Banner";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { APIKEY } from "../../config";

import "./movieInfo.scss";

class MovieInfo extends Component {
  state = {
    loading: true,
    movie: [],
    credits: [],
    similar_movies: [],
    movieRecommedations: [],
    trailers: [],

    modalIsOpen: false
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

  getMovieById = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`
    );
    const movie = await resp.json();
    this.setState({ movie });
  };

  getSimilarMovies = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const movies = await resp.json();
    this.setState({ similar_movies: movies.results });
  };

  getMovieCredits = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/credits?&api_key=${APIKEY}&language=en-US`
    );
    const credits = await resp.json();
    this.setState({ credits: credits.cast });

    setTimeout(() => this.setState({ loading: false }), 500);
  };

  getMovieRecommendations = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/recommendations?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const movieRecommedations = await resp.json();
    this.setState({ movieRecommedations: movieRecommedations.results });
  };

  getTrailers = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}/videos?&api_key=${APIKEY}&language=en-US`
    );
    const trailers = await resp.json();
    this.setState({ trailers: trailers.results });
  };

  render() {
    const { movie, movieRecommedations, trailers, modalIsOpen } = this.state;
    const base_url = "https://image.tmdb.org/t/p/w500";
    const base_url2 = "https://image.tmdb.org/t/p/w1400_and_h450_face";

    const genres = movie.genres;
    let list = genres && genres.map(g => g.name + " ");

    console.log(this.state);

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
              imgPath={movie.poster_path}
              base_url={base_url}
              movie={movie}
              list={list}
            />

            <Banner
              base_url={base_url2}
              movie={movie}
              trailers={trailers}
              openModal={this.openModal}
              modalIsOpen={modalIsOpen}
              closeModal={this.closeModal}
            />
          </>
        )}
      </div>
    );
  }
}

export default MovieInfo;
