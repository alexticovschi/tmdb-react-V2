import React, { Component } from 'react'
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import SlickSlider from "../../components/Slider/SlickSlider";


import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Home.css';

class Home extends Component {
    state = {
        upcomingMovies: [],
        nowPlayingMovies: [],
        popularMovies: [],
        topRatedMovies: []
    }

    componentDidMount() {
        this.getUpcomingMovies();
        this.getNowPlayingMovies();
        this.getPopularMovies();
        this.getTopRatedMovies();
    }

    getLatestMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/latest?&api_key=${APIKEY}&language=en-US`);

        const latest = await resp.json();

        this.setState({ latest });
    }

    getUpcomingMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/upcoming?&api_key=${APIKEY}&language=en-US`);

        const upcomingMovies = await resp.json();

        this.setState({ upcomingMovies: upcomingMovies.results });
    }

    getNowPlayingMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/now_playing?&api_key=${APIKEY}&language=en-US`);

        const nowPlayingMovies = await resp.json();

        this.setState({ nowPlayingMovies: nowPlayingMovies.results });
    }

    getPopularMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?&api_key=${APIKEY}&language=en-US`);

        const popularMovies = await resp.json();

        this.setState({ popularMovies: popularMovies.results });
    }

    getTopRatedMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US`);

        const topRatedMovies = await resp.json();

        this.setState({ topRatedMovies: topRatedMovies.results });
    }

    render() {
        const upcoming = this.state.upcomingMovies;
        const popular = this.state.popularMovies;
        const toprated = this.state.topRatedMovies;

        return (
            <div>
                <Navbar/>
                <main className="container" style={{ marginTop: "56px" }}>
                    <Carousel movies={this.state.nowPlayingMovies} />    

                    <div className="slider_slick_box">
                        <div className="slider_slick_box__title">Upcoming</div>
                        <SlickSlider items={upcoming}/>
                    </div>

                    <hr className="slider_slick_container__separator"/>
                    <div className="slider_slick_box">
                        <div className="slider_slick_box__title">Popular</div>
                        <SlickSlider items={popular}/>
                    </div>

                    <hr className="slider_slick_container__separator"/>
                    <div className="slider_slick_box">
                        <div className="slider_slick_box__title">Top Rated</div>
                        <SlickSlider items={toprated}/>
                    </div>
                </main>

                <footer></footer>

                <Loader/>
            </div>

        )
    }
}

export default Home;