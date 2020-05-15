import React, { Component } from 'react';
import SearchBoxWithSuggestionsTV from '../../components/TVShowsComponents/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions';
import TVShowsList from '../../components/TVShowsComponents/TVShows/TVShows';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { APIKEY } from '../../config';

import './popularTVShows.scss';

class PopularTVShows extends Component {
  state = {
    loading: true,
    popularTVShows: [],
    total_pages: 0,
    page: 2,
  };

  componentDidMount() {
    this.getPopularTVShows();
  }

  getPopularTVShows = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/popular?&api_key=${APIKEY}&language=en-US`
    );
    const popularTVShows = await resp.json();
    this.setState({ popularTVShows: popularTVShows.results });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  loadMore = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=en-US&page=${
        this.state.page
      }`
    );
    const tvshows = await resp.json();

    let count = this.state.page + 1;
    this.setState({ page: count });

    const new_list = [...this.state.popularTVShows, ...tvshows.results];
    this.setState({ popularTVShows: new_list });
  };

  render() {
    return (
      <section className="popular-tv-shows-container">
        {this.state.loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#fff" width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestionsTV />

            <TVShowsList
              displayNavButtons
              title="Popular TV Shows"
              tvShowList={this.state.popularTVShows}
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

export default PopularTVShows;
