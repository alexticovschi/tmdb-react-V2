import React, { Component } from 'react';
import SearchBoxWithSuggestions from '../../components/TVShowsComponents/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions';
import TVShowData from '../../components/TVShowInfoComponents/TVShowData/TVShowData';
import TVShowOverview from '../../components/MovieInfoComponents/MovieOverview/MovieOverview';
import TVShowCredits from '../../components/MovieInfoComponents/MovieCredits/MovieCredits';
import TVShowInfoBar from '../../components/TVShowInfoComponents/TVShowInfoBar/TVShowInfoBar';
import Recommendations from '../../components/Recommendations/Recommendations';
import SimilarTVShows from '../../components/TVShowInfoComponents/SimilarTVShows/SimilarTVShows';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { APIKEY } from '../../config';

import './tvShowInfo.scss';

class MovieInfo extends Component {
  state = {
    loading: true,
    tvShow: [],
    tvShowCredits: [],
    similarTVShows: [],
    tvShowRecommendations: []
  };

  componentDidMount() {
    const { tv_show_id } = this.props.match.params;
    this.getTVShowById(tv_show_id);
    this.getSimilarTVShows(tv_show_id);
    this.getTVShowCredits(tv_show_id);
    this.getTVShowsRecommendations(tv_show_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { tv_show_id } = this.props.match.params;
      this.getTVShowById(tv_show_id);
      this.getSimilarTVShows(tv_show_id);
      this.getTVShowCredits(tv_show_id);
      this.getTVShowsRecommendations(tv_show_id);
    }
  }

  getTVShowById = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/${ID}?&api_key=${APIKEY}&language=en-US`
    );
    const tvShow = await resp.json();
    this.setState({ tvShow });

    setTimeout(() => this.setState({ loading: false }), 150);
  };

  getTVShowCredits = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/${ID}/credits?&api_key=${APIKEY}&language=en-US`
    );
    const tvShowCredits = await resp.json();
    this.setState({ tvShowCredits: tvShowCredits.cast });
  };

  getSimilarTVShows = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const similarTVShows = await resp.json();
    this.setState({ similarTVShows: similarTVShows.results });
  };

  getTVShowsRecommendations = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/${ID}/recommendations?&api_key=${APIKEY}&language=en-US&page=1`
    );
    const tvShowRecommendations = await resp.json();
    this.setState({ tvShowRecommendations: tvShowRecommendations.results });
  };

  render() {
    const {
      tvShow,
      tvShowRecommendations,
      tvShowCredits,
      similarTVShows
    } = this.state;

    const creators = tvShow.created_by;

    const base_url = 'https://image.tmdb.org/t/p/w500';
    const base_url2 = 'https://image.tmdb.org/t/p/w1400_and_h450_face';

    const genres = tvShow.genres;

    return (
      <div className='tvshow-info-container'>
        {this.state.loading ? (
          <div className='loader-container'>
            <Loader type='Oval' color='#fff' width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestions />
            <TVShowData
              imgPath1={tvShow.poster_path}
              imgPath2={tvShow.backdrop_path}
              base_url1={base_url}
              base_url2={base_url2}
              tvShow={tvShow}
              list={genres}
            />

            <TVShowOverview overview={tvShow.overview} />

            <TVShowInfoBar
              creators={creators}
              first_air_date={tvShow.first_air_date}
            />

            {tvShowCredits.length > 0 ? (
              <TVShowCredits credits={tvShowCredits} />
            ) : null}
            {/* 
            {tvShowRecommendations.length > 0 ? (
              <Recommendations
                path='/tv-show-info'
                recommendations={tvShowRecommendations}
              />
            ) : null} */}

            {similarTVShows.length > 0 ? (
              <SimilarTVShows
                movieList={similarTVShows}
                getMovieById={this.getMovieById}
              />
            ) : null}
          </>
        )}
      </div>
    );
  }
}

export default MovieInfo;
