import React, { Component } from 'react';
import TVShowsList from '../../components/TVShowsComponents/TVShows/TVShows';
import SearchBoxWithSuggestionsTV from '../../components/TVShowsComponents/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { APIKEY } from '../../config';

import './tvshows.scss';

class TVShows extends Component {
  state = {
    loading: true,
    tvShows: [],
    total_pages: 0,
    page: 2
  };

  componentDidMount() {
    this.getTVShows();
  }

  getTVShows = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today?&api_key=${APIKEY}&sort_by=popularity.desc&language=en-US&page=${this.state.page}`
    );
    const tvShows = await resp.json();

    let count = this.state.page + 1;
    this.setState({ page: count });

    const new_list = [...this.state.tvShows, ...tvShows.results];
    this.setState({ tvShows: new_list });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  render() {
    const tvShows = this.state.tvShows;

    return (
      <div className='tvshows-container'>
        {this.state.loading ? (
          <div className='loader-container'>
            <Loader type='Oval' color='#fff' width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestionsTV />

            <TVShowsList
              displayNavButtons
              title='Airing Today TV Shows'
              tvShowList={tvShows}
            />
          </>
        )}
        <div className='loadmore-container'>
          <button className='btn' onClick={this.getTVShows}>
            Load More
          </button>
        </div>
      </div>
    );
  }
}

export default TVShows;
