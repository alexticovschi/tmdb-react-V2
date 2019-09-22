import React, { Component } from "react";

import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";
import MovieList from "../../components/MoviesComponents/Movies/Movies";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { APIKEY } from "../../config";

import "./movies.scss";

class Movies extends Component {
  state = {
    loading: true,
    movies: [],
    total_pages: 0,
    page: 2
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie/?certification_country=US&api_key=${APIKEY}&certification=R&sort_by=popularity.desc&page=${this.state.page}`
    );
    const movies = await resp.json();

    let count = this.state.page + 1;
    this.setState({ page: count });

    const new_list = [...this.state.movies, ...movies.results];
    this.setState({ movies: new_list });

    setTimeout(() => this.setState({ loading: false }), 500);
  };

  getMovieById = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`
    );
    const movie = await resp.json();
    this.setState({ movie });
  };

  render() {
    console.log(this.state.movies);

    return (
      <div className="movies-container">
        {this.state.loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#fff" width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestions />
            <MovieList
              movieList={this.state.movies}
              getMovieById={this.getMovieById}
            />
          </>
        )}
        <div className="loadmore-container">
          <button className="btn" onClick={this.getMovies}>
            Load More
          </button>
        </div>
      </div>
    );
  }
}

export default Movies;
