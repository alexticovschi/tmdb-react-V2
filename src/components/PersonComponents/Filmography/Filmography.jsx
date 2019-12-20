import React from 'react';
import MovieList from '../../MovieList/MovieList';

import './filmography.scss';

const Filmography = ({ movieList, getMovieById, title }) => {
  return (
    <section className='filmography'>
      <div className='filmography__wrapper'>
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

export default Filmography;
