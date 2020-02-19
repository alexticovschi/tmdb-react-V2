import React from 'react';

import NavButtons from '../NavButtons/Buttons';

import MovieList from '../../MovieList/MovieList';

import './movies.scss';

const Movies = ({ movieList, getMovieById, title, displayNavButtons }) => {
  return (
    <section className='movie-list'>
      <div className='movie-list__wrapper'>
        {displayNavButtons === true ? <NavButtons /> : null}

        <div className='group'>
          <div className='group-item line' />
          <h1 className='title group-item text'>{title}</h1>
          <div className='group-item line' />
        </div>

        <MovieList movieList={movieList} getMovieById={getMovieById} />
      </div>
    </section>
  );
};

export default Movies;
