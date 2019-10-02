import React, { Component } from "react";
import SearchBoxWithSuggestions from "../../components/TVShowsComponents/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";
import TVShowData from "../../components/TVShowInfoComponents/TVShowData/TVShowData";
import Banner from "../../components/MovieInfoComponents/Banner/Banner";
import MovieOverview from "../../components/MovieInfoComponents/MovieOverview/MovieOverview";
import MovieInfoBar from "../../components/MovieInfoComponents/MovieInfoBar/MovieInfoBar";
import MovieCredits from "../../components/MovieInfoComponents/MovieCredits/MovieCredits";
import Recommendations from "../../components/MovieInfoComponents/Recommendations/Recommendations";
import SimilarMovies from "../../components/MovieInfoComponents/SimilarMovies/SimilarMovies";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { APIKEY } from "../../config";

import "./tvShowInfo.scss";

class MovieInfo extends Component {
  state = {
    loading: true,
    tvShow: [],
    tvShowCredits: [],
    similarTVShows: [],
    tvShowRecommedations: []
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

    setTimeout(() => this.setState({ loading: false }), 500);
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
    const tvShowRecommedations = await resp.json();
    this.setState({ tvShowRecommedations: tvShowRecommedations.results });
  };

  render() {
    const {
      tvShow,
      tvShowRecommedations,
      tvShowCredits,
      similarTVShows
    } = this.state;

    const base_url = "https://image.tmdb.org/t/p/w500";
    const base_url2 = "https://image.tmdb.org/t/p/w1400_and_h450_face";

    console.log(this.state.tvShow);

    const genres = tvShow.genres;

    return (
      <div className="tvshow-info-container">
        {this.state.loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#fff" width={60} height={60} />
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

            <MovieOverview overview={tvShow.overview} />

            <MovieCredits credits={tvShowCredits} />
          </>
        )}
      </div>
    );
  }
}

export default MovieInfo;
