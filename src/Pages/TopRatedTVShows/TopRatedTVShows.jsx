import React, { Component } from 'react';
import SearchBoxWithSuggestionsTV from '../../components/TVShowsComponents/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions';
import TVShowsList from '../../components/TVShowsComponents/TVShows/TVShows';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { APIKEY } from '../../config';

import './topRatedTVShows.scss';

class TopRatedTVShows extends Component {
  state = {
    loading: true,
    topRatedTVShows: [],
    total_pages: 0,
    page: 2,
  };

  componentDidMount() {
    this.getTopRatedTVShows();
  }

  getTopRatedTVShows = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?&api_key=${APIKEY}&language=en-US`
    );
    const topRatedTVShows = await resp.json();
    this.setState({ topRatedTVShows: topRatedTVShows.results });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  loadMore = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=en-US&page=${
        this.state.page
      }`
    );
    const tvshows = await resp.json();

    let count = this.state.page + 1;
    this.setState({ page: count });

    const new_list = [...this.state.topRatedTVShows, ...tvshows.results];
    this.setState({ topRatedTVShows: new_list });
  };

  render() {
    return (
      <section className="top-rated-tv-shows-container">
        {this.state.loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#fff" width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestionsTV />

            <TVShowsList
              displayNavButtons
              title="Top Rated TV Shows"
              tvShowList={this.state.topRatedTVShows}
            />
          </>
        )}
        <div className="loadmore-container">
          <button className="btn" onClick={this.loadMore}>
            Load More
          </button>
        </div>
      </section>
    );
  }
}

export default TopRatedTVShows;
