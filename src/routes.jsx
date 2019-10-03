import React, { Component } from "react";

import Navbar from "./components/Navbar/Navbar";

import Home from "./Pages/Home/Home";
import Movies from "./Pages/Movies/Movies";
import MovieInfo from "./Pages/MovieInfo/MovieInfo";
import TVShows from "./Pages/TVShows/TVShows";
import TVShowInfo from "./Pages/TVShowInfo/TVShowInfo";
import Genres from "./Pages/Genres/Genres";

import Footer from "./components/Footer/Footer";

// import MovieInfo from "./containers/MovieInfo/MovieInfo";
// import ActorProfileInfo from "./containers/ActorProfileInfo/ActorProfileInfo";
// import ActorImages from "./components/ActorImages/ActorImages";
// import TVShows from "./containers/TVShows/TVShows";
// import TVShowInfo from "./containers/TVShowInfo/TVShowInfo";
// import PopularTvShows from "./containers/PopularTvShows/PopularTvShows";
// import NowOnTheAirTVShows from "./containers/NowOnTheAirTVShows/NowOnTheAirTVShows";
// import TopRatedTvShows from "./containers/TopRatedTvShows/TopRatedTvShows";
// import LatestTvShows from "./containers/LatestTvShows/LatestTvShows";
// import NowPlayingMovies from "./containers/NowPlayingMovies/NowPlayingMovies";
// import PopularMovies from "./containers/PopularMovies/PopularMovies";
// import TopRatedMovies from "./containers/TopRatedMovies/TopRatedMovies";
import MovieGenres from "./containers/MovieGenres/MovieGenres";

import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

import "./routes.scss";

class Routes extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/movie-info/:movie_id" component={MovieInfo} />
          <Route exact path="/tv-shows" component={TVShows} />
          <Route exact path="/tv-show-info/:tv_show_id" component={TVShowInfo} />
          <Route exact path="/genres" component={Genres} />
          <Route exact path="/genres/:genre_id" component={Genres} />

          {/* <Route exact path="/movies/now-playing" component={Movies} />
          <Route exact path="/movies/popular" component={PopularMovies} />
          <Route exact path="/movies/top-rated" component={TopRatedMovies} />
          <Route exact path="/genres" component={MovieGenres} />{" "}
          <Route exact path="/genres/:genre_id" component={MovieGenres} />
          <Route exact path="/tv-shows" component={TVShows} />
          <Route exact path="/tv-shows/popular" component={PopularTvShows} />
          <Route
            exact
            path="/tv-shows/now-on-the-air"
            component={NowOnTheAirTVShows}
          />
          <Route exact path="/tv-shows/top-rated" component={TopRatedTvShows} />
          <Route exact path="/tv-shows/latest" component={LatestTvShows} />
          <Route
            exact
            path="/tv-show-info/:tv_show_id"
            component={TVShowInfo}
          /> */}
          {/* <Route exact path="/movie-info/:movie_id" component={MovieInfo} /> */}
          {/* <Route
            exact
            path="/cast/actor-profile-info/:actor_id"
            component={ActorProfileInfo}
          />
          <Route
            exact
            path="/cast/:actor_id/images/profiles"
            component={ActorImages}
          /> */}
        </Switch>

        <ScrollUpButton ContainerClassName="scroll-up-button" />

        <Footer />
      </div>
    );
  }
}

export default withRouter(Routes);
