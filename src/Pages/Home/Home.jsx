import React, { Component } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import Carousel from "../../components/HomeComponents/Carousel/Carousel";
import HomeMovieList from "../../components/HomeComponents/HomeMovieList/HomeMovieList";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { APIKEY } from "../../config";

import "./home.scss";

class Home extends Component {
  state = {
    loading: true,
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

  getUpcomingMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?&api_key=${APIKEY}&language=en-US`
    );
    const upcomingMovies = await resp.json();
    this.setState({ upcomingMovies: upcomingMovies.results });
  };

  getNowPlayingMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?&api_key=${APIKEY}&language=en-US`
    );
    const nowPlayingMovies = await resp.json();
    this.setState({
      nowPlayingMovies: nowPlayingMovies.results
    });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  getPopularMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/popular?&api_key=${APIKEY}&language=en-US`
    );
    const popularMovies = await resp.json();
    this.setState({ popularMovies: popularMovies.results });
  };

  getTopRatedMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US`
    );
    const topRatedMovies = await resp.json();
    this.setState({ topRatedMovies: topRatedMovies.results });
  };

  getLatestMovies = async () => {
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
      <div className="home-container">
        {this.state.loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#fff" width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestions />
            <Carousel movies={this.state.nowPlayingMovies} />
            <HomeMovieList
              latestMovies={this.state.latestMovies}
              getMovieById={this.getMovieById}
            />
          </>
        )}
      </div>
    );
  }
}

export default Home;
