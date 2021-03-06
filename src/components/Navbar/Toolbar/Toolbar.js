import React from 'react';
import { Link } from 'react-router-dom';
// import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import ToggleButton from '../SideDrawer/ToggleButton';

import './Toolbar.scss';

const Toolbar = ({ isOpen, drawerClickHandler }) => (
  <header className="toolbar">
    <div className="toolbar-wrapper">
      <nav className="toolbar__navigation">
        <div className="toolbar__logo">
          <Link to="/">
            <img
              src="https://www.themoviedb.org/assets/1/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {/* <Link to="/movies/now-playing">Movies</Link> */}
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/tv-shows/airing-today">TV Shows</Link>
            </li>
            <li>
              <Link to="/genres/80">Genres</Link>
            </li>
            <li>
              <a href="https://www.themoviedb.org/login?language=en-US">
                Login
              </a>
            </li>
          </ul>
        </div>
        <ToggleButton isOpen={isOpen} click={drawerClickHandler} />
      </nav>
    </div>
  </header>
);

export default Toolbar;
