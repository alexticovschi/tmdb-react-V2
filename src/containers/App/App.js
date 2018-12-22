import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import MovieInfo from '../MovieInfo/MovieInfo';
import ActorProfileInfo from '../ActorProfileInfo/ActorProfileInfo';
import ActorImages from '../ActorImages/ActorImages';
import TVShows from '../TVShows/TVShows';
import TVShowInfo from '../TVShowInfo/TVShowInfo';
import PopularTvShows from '../PopularTvShows/PopularTvShows';
import NowOnTheAirTVShows from '../NowOnTheAirTVShows/NowOnTheAirTVShows';
import TopRatedTvShows from '../TopRatedTvShows/TopRatedTvShows';
import LatestTvShows from '../LatestTvShows/LatestTvShows';
import Home from '../Home/Home';
import SearchMovies from '../SearchMovies/SearchMovies';
import Footer from '../../components/Footer/Footer';
import Loader from "../../components/Loader/Loader";

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ScrollUpButton from "react-scroll-up-button"; 

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar/>
      
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={SearchMovies} />
              <Route exact path="/tv-shows" component={TVShows} />
              <Route exact path="/tv-shows/popular" component={PopularTvShows} />
              <Route exact path="/tv-shows/now-on-the-air" component={NowOnTheAirTVShows} />
              <Route exact path="/tv-shows/top-rated" component={TopRatedTvShows} />
              <Route exact path="/tv-shows/latest" component={LatestTvShows} />
              <Route exact path="/tv-show-info/:tv_show_id" component={TVShowInfo} />
              <Route exact path="/movie-info/:movie_id" component={MovieInfo} />
              <Route exact path="/cast/actor-bio/:actor_id" component={ActorProfileInfo} />
              <Route exact path="/cast/:actor_id/images/profiles" component={ActorImages} />
          </Switch>

        <ScrollUpButton ContainerClassName="scroll-up-button"/>
        
        <Loader/>
        
        <Footer/>
      </div>
    );
  }
}

export default withRouter(App);
