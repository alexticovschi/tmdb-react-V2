import React from 'react';
import NavButtons from '../NavButtons/Buttons';

import TVShowsList from '../TVShowsList/TVShowsList';

import './tvshows.scss';

const TVShows = ({ tvShowList, getTVShowById, displayNavButtons, title }) => {
  return (
    <section className='tvshow-list'>
      <div className='tvshow-list__wrapper'>
        {displayNavButtons === true ? <NavButtons /> : null}

        <div className='group'>
          <div className='group-item line' />
          <h1 className='title group-item text'>{title}</h1>
          <div className='group-item line' />
        </div>
        <TVShowsList tvShowList={tvShowList} getTVShowById={getTVShowById} />
      </div>
    </section>
  );
};

export default TVShows;
