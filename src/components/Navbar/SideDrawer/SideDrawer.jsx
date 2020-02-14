import React from 'react';

import './SideDrawer.scss';

const SideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a className='btn' href='/'>
            Home
          </a>
        </li>
        <li>
          <a className='btn' href='/movies'>
            Movies
          </a>
        </li>
        <li>
          <a className='btn' href='/tv-shows/airing-today'>
            TV Shows
          </a>
        </li>
        <li>
          <a className='btn' href='/genres/80'>
            Genres
          </a>
        </li>
        <li>
          <a
            className='btn'
            href='https://www.themoviedb.org/login?language=en-US'
          >
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
