import React, { Component } from 'react';
import MovieList from '../../components/MoviesComponents/Movies/Movies';

import Select from 'react-select';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './genres.scss';
import { APIKEY } from '../../config';

class Genres extends Component {
  state = {
    loading: true,
    genre: [],
    movieGenres: [],
    total_pages: 0,
    page: 2,
    id: null,
    selectedOption: null
  };

  componentDidMount() {
    const { genre_id } = this.props.match.params;
    this.getGenreById(genre_id);
    this.getMovieGenres();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getGenreById(this.state.selectedOption.value);
    }
  }

  loadMore = async () => {
    if (!this.state.total_pages > 1) return false;
    const ID = this.state.id;
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${ID}&api_key=${APIKEY}&page=${this.state.page}&sort_by=popularity.desc&primary_release_year=2018`
    );
    let count = this.state.page + 1;
    this.setState({ page: count });
    const data = await resp.json();

    const new_list = [
      ...this.state.genre,
      ...data.results.filter(item => item.poster_path !== null)
    ];
    this.setState({ genre: new_list });
  };

  getMovieGenres = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?&api_key=${APIKEY}&language=en-US`
    );

    const data = await resp.json();
    this.setState({ movieGenres: data.genres });
    setTimeout(() => this.setState({ loading: false }), 150);
  };

  getGenreById = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${ID}&api_key=${APIKEY}&sort_by=popularity.desc`
    );

    const data = await resp.json();

    this.setState({
      total_pages: data.total_pages,
      page: 2,
      genre: data.results,
      id: ID
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.history.push(`/genres/${selectedOption.value}`);
  };

  onChange = e => this.props.history.push(`/genre/${e.target.value}`);

  render() {
    const { selectedOption, movieGenres } = this.state;
    const options = [];

    movieGenres.map(item => {
      return options.push({ label: item.name, value: item.id });
    });

    return (
      <div className='genres-container'>
        {this.state.loading ? (
          <div className='loader-container'>
            <Loader type='Oval' color='#fff' width={60} height={60} />
          </div>
        ) : (
          <>
            <div className='genres-container__inner'>
              <div className='genres-container__select'>
                <Select
                  className='select'
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  placeholder={'Select a genre...'}
                  theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#88d383',
                      neutral20: 'green',
                      primary: 'green'
                    }
                  })}
                />
              </div>
              <MovieList
                displayNavButtons='false'
                title='Genres'
                movieList={this.state.genre}
                getMovieById={this.getMovieById}
              />
            </div>
          </>
        )}

        <div className='loadmore-container'>
          <button className='btn' onClick={this.loadMore}>
            Load More
          </button>
        </div>
      </div>
    );
  }
}

export default Genres;
