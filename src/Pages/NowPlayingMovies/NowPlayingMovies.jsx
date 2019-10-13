import React, { Component } from "react";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieList from "../../components/MoviesComponents/Movies/Movies";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { APIKEY } from "../../config";

import "./nowPlayingMovies.scss";

class NowPlayingMovies extends Component {
  state = {
    loading: true,
    nowPlayingMovies: [],
    total_pages: 0,
    page: 2
  };

  componentDidMount() {
    this.getNowPlayingMovies();
  }

  getNowPlayingMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const nowPlayingMovies = await resp.json();

    this.setState({ nowPlayingMovies: nowPlayingMovies.results });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  getMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&sort_by=popularity.desc&page=${this.state.page}`
    );
    const movies = await resp.json();

    let count = this.state.page + 1;
    this.setState({ page: count });

    const new_list = [...this.state.nowPlayingMovies, ...movies.results];
    this.setState({ nowPlayingMovies: new_list });
  };

  render() {
    return (
      <section className="now-playing-movies-container">
        {this.state.loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#fff" width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestions />

            <MovieList
              displayNavButtons={true}
              title="Now Playing Movies"
              movieList={this.state.nowPlayingMovies}
              getMovieById={this.getMovieById}
            />
          </>
        )}
        <div className="loadmore-container">
          <button className="btn" onClick={this.getMovies}>
            Load More
          </button>
        </div>
      </section>
    );
  }
}

export default NowPlayingMovies;
