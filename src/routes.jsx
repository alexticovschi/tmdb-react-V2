import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Home from './Pages/Home/Home';
import Movies from './Pages/Movies/Movies';
import People from './Pages/People/People';
import MovieInfo from './Pages/MovieInfo/MovieInfo';
import TopRatedMovies from './Pages/TopRatedMovies/TopRatedMovies';
import PopularMovies from './Pages/PopularMovies/PopularMovies';
import NowPlayingMovies from './Pages/NowPlayingMovies/NowPlayingMovies';

import TVShows from './Pages/TVShows/TVShows';
import PopularTVShows from './Pages/PopularTVShows/PopularTVShows';
import TopRatedTVShows from './Pages/TopRatedTVShows/TopRatedTVShows';
import NowOnAirTVShows from './Pages/NowOnAirTVShows/NowOnAirTVShows';

import TVShowInfo from './Pages/TVShowInfo/TVShowInfo';
import Genres from './Pages/Genres/Genres';
import Person from './Pages/Person/Person';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ScrollUpButton from 'react-scroll-up-button';

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/people" component={People} />
          <Route exact path="/movie-info/:movie_id" component={MovieInfo} />
          <Route exact path="/movies/top-rated" component={TopRatedMovies} />
          <Route exact path="/movies/popular" component={PopularMovies} />
          <Route
            exact
            path="/movies/now-playing"
            component={NowPlayingMovies}
          />

          <Route exact path="/tv-shows/airing-today" component={TVShows} />
          <Route
            exact
            path="/tv-shows/now-on-the-air"
            component={NowOnAirTVShows}
          />
          <Route exact path="/tv-shows/popular" component={PopularTVShows} />
          <Route exact path="/tv-shows/top-rated" component={TopRatedTVShows} />
          <Route
            exact
            path="/tv-show-info/:tv_show_id"
            component={TVShowInfo}
          />
          <Route exact path="/genres" component={Genres} />
          <Route exact path="/genres/:genre_id" component={Genres} />
          <Route exact path="/person/:person_id" component={Person} />
        </Switch>

        <ScrollUpButton ContainerClassName="scroll-up-button" />
      </Layout>
    );
  }
}

export default withRouter(Routes);
