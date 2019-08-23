import React, { Component } from "react";
import Carousel from "../../components/Carousel/Carousel";
import MovieList from "../../components/MovieList/MovieList";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";

import { APIKEY } from "../../config";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import "./Home.scss";

class Home extends Component {
  state = {
    movie: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    latestMovies: []
  };

  componentDidMount() {
    this.getUpcomingMovies();
    this.getNowPlayingMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getLatestMovies();
  }

  getUpcomingMovies = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?&api_key=${APIKEY}&language=en-US`
    );
    const upcomingMovies = await resp.json();
    this.setState({ upcomingMovies: upcomingMovies.results });
  };

  getNowPlayingMovies = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?&api_key=${APIKEY}&language=en-US`
    );
    const nowPlayingMovies = await resp.json();
    setTimeout(() => {
        this.setState({ nowPlayingMovies: nowPlayingMovies.results });
    }, 2000);
  };

  getPopularMovies = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/popular?&api_key=${APIKEY}&language=en-US`
    );
    const popularMovies = await resp.json();
    this.setState({ popularMovies: popularMovies.results });
  };

  getTopRatedMovies = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US`
    );
    const topRatedMovies = await resp.json();
    this.setState({ topRatedMovies: topRatedMovies.results });
  };

  getLatestMovies = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    const latestMovies = await resp.json();
    this.setState({ latestMovies: latestMovies.results });
  };

  getMovieById = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`
    );
    const movie = await resp.json();
    this.setState({ movie });
  };

  render() {
    return (
      <div className="home-wrapper">
        {!this.state.nowPlayingMovies.length ? (
          <div className="loader-container">
            <Loader type="Rings" color="#fff" width={200} height={200} />
          </div>
        ) : (
          <div>
            <SearchBoxWithSuggestions />

            <div className="container">
              <Carousel movies={this.state.nowPlayingMovies} />

              <div className="group">
                <div className="group-item line" />
                <h1 className="title group-item text">Latest Movies</h1>
                <div className="group-item line" />
              </div>

              <MovieList
                movieList={this.state.latestMovies}
                getMovieById={this.getMovieById}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
