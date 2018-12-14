import React, { Component } from 'react';
import SimilarMovieList from '../../components/SimilarMovieList/SimilarMovieList';
import Loader from '../../components/Loader/Loader';
import ActorImageCard from '../../components/ActorImageCard/ActorImageCard';
import Navbar from "../../components/Navbar/Navbar";

import './MovieInfo.css';

class MovieInfo extends Component {
    state = {
        movie: [],
        credits: [],
        similar_movies: [],
        trailers: []
    }

    componentDidMount() {
        const { movie_id } = this.props.match.params;
        this.getMovieById(movie_id);
        this.getSimilarMovies(movie_id);
        this.getMovieCredits(movie_id);
        this.getTrailers(movie_id);
    }

    getMovieById = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        // https://api.themoviedb.org/3/movie/tt4154756?api_key=9baa3cbfd9b62ea4f97966abadf41653
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`);

            const movie = await resp.json();

            this.setState({ movie });
            // console.log('[MOVIE]:',this.state.movie);
            console.log({movie});
    }

    getSimilarMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`);

        const movies = await resp.json();

        this.setState({ similar_movies: movies.results });
        // console.log('[MOVIE]:',this.state.similar_movies);
        // console.log({movies});
    }

    getMovieCredits = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/credits?&api_key=${APIKEY}&language=en-US`);
    
        const credits = await resp.json();
        this.setState({ credits: credits.cast });
        // console.log('[CREDITS]', credits);
    }

    getTrailers = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/videos?&api_key=${APIKEY}&language=en-US`);

        const trailers = await resp.json();
        this.setState({ trailers: trailers.results });
        console.log('[trailers]', trailers);
    }

    render() {
        const {movie} = this.state;
        const base_url = 'https://image.tmdb.org/t/p/w780';
        const genres = movie.genres;
        let list = genres && genres.map(g => g.name + ' ');

        // console.log(this.state.credits);
        return (
            <div className="box" style={{ marginTop: "56px" }}>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="box-left">
                            <img className="img-info" src={base_url + movie.poster_path} alt={"img card"} />
                        </div>
                        <div className="box-right">
                            <div className="inner-box-right">
                                <h1 className="info-title">{movie.original_title}</h1> 
                                <hr/>
                                {list !== null ? <p><strong>Genre:</strong>  {list}</p> : null}
                                <p><strong>Released: </strong>  {movie.release_date}</p>
                                <p><strong>Tagline: </strong>  {movie.tagline}</p> 
                                {movie.BoxOffice ? <p><strong>BoxOffice: </strong>  {movie.BoxOffice}</p> : null}
                                {movie.homepage ? <p><strong>Website: </strong>  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p> : null}
                                
                                <div className="btn-div">
                                    <a className="btn btn-info b1" href={`http://imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">View on IMDB</a>
                                    <button className="btn btn-info b2" onClick={() => this.props.history.push('/search')}>Back To Search</button>
                                </div>
                            </div>
                        
                        </div>
                    </div>    
                </div>

                <div className="flex-container trailers">
                    <div className="main-content" style={{marginTop:"30px"}}>
                        {this.state.trailers.map(trailer => (
                            <div key={trailer.key}>

                                <iframe 
                                    className="iframe-card"
                                    style={{borderRadius:"6px", margin:"10px auto"}} 
                                    title="1" 
                                    width="400" 
                                    height="200"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container actors" style={{borderTop:"1px solid #fff"}}>
                        <h1><strong>Full Cast</strong></h1>

                        <main className="main-content">
                            {this.state.credits &&
                                this.state.credits.map(actor => {
                                    return <ActorImageCard key={actor.id} actor={actor}/>
                                }
                            )}
                        </main>
                </div>

                <div className="flex-container">
                    {this.state.similar_movies.length > 0 ?
                        <div className="similar_movies">
                            <h1>Similar Movies</h1>
                            <SimilarMovieList
                                movieList={this.state.similar_movies}
                                getMovieById={this.getMovieById} />
                                    
                            {/* <button className="btn btn-info b3" onClick={() => this.props.history.push('/')}>Back To Search</button> */}
                        </div>
                        : null}
                </div>

                <footer className="footer">
                     
                </footer>

                <Loader/>
            </div>
        );
    }
}

export default MovieInfo;