import React, { Component } from 'react';
import SearchBoxWithSuggestions from '../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions';
import TVShowsList from '../../components/TVShowsComponents/TVShows/TVShows';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { APIKEY } from '../../config';

import './nowOnAirTVShows.scss';

class NowOnAirTVShows extends Component {
  state = {
    loading: true,
    onAirTVShows: [],
    total_pages: 0,
    page: 2
  };

  componentDidMount() {
    this.getOnAirTVShows();
  }

  getOnAirTVShows = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?&api_key=${APIKEY}&language=en-US`
    );
    const onAirTVShows = await resp.json();
    this.setState({ onAirTVShows: onAirTVShows.results });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  loadMore = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=en-US&page=${this.state.page}`
    );
    const tvshows = await resp.json();

    let count = this.state.page + 1;
    this.setState({ page: count });

    const new_list = [...this.state.onAirTVShows, ...tvshows.results];
    this.setState({ onAirTVShows: new_list });
  };

  render() {
    return (
      <section className='now-on-air-tv-shows-container'>
        {this.state.loading ? (
          <div className='loader-container'>
            <Loader type='Oval' color='#fff' width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestions />

            <TVShowsList
              displayNavButtons
              title='Currently Airing TV Shows'
              tvShowList={this.state.onAirTVShows}
            />
          </>
        )}
        <div className='loadmore-container'>
          <button className='btn' onClick={this.loadMore}>
            Load More
          </button>
        </div>
      </section>
    );
  }
}

export default NowOnAirTVShows;
