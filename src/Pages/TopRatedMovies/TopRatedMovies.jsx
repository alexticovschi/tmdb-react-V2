import React, { Component } from 'react';
import SearchBoxWithSuggestions from '../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions';
import MovieList from '../../components/MoviesComponents/Movies/Movies';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { APIKEY } from '../../config';

import './topRatedMovies.scss';

class PopularTVShows extends Component {
  state = {
    loading: true,
    topRatedMovies: [],
    total_pages: 0,
    page: 2
  };

  componentDidMount() {
    this.getTopRatedMovies();
  }

  getTopRatedMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const topRatedMovies = await resp.json();
    this.setState({ topRatedMovies: topRatedMovies.results });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  getMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US&page=${this.state.page}`
    );
    const movies = await resp.json();

    let count = this.state.page + 1;
    this.setState({ page: count });

    const new_list = [...this.state.topRatedMovies, ...movies.results];
    this.setState({ topRatedMovies: new_list });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  render() {
    return (
      <section className='top-rated-movies-container'>
        {this.state.loading ? (
          <div className='loader-container'>
            <Loader type='Oval' color='#fff' width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestions />

            <MovieList
              displayNavButtons
              title='Top Rated Movies'
              movieList={this.state.topRatedMovies}
              getMovieById={this.getMovieById}
            />
          </>
        )}
        <div className='loadmore-container'>
          <button className='btn' onClick={this.getMovies}>
            Load More
          </button>
        </div>
      </section>
    );
  }
}

export default PopularTVShows;
