import React from "react";

import TVShowsList from "../TVShowsList/TVShowsList";

import "./tvshows.scss";

const TVShows = ({ tvShowList, getTVShowById }) => {
  return (
    <section className="tvshow-list">
      <div className="tvshow-list__wrapper">
        <div className="group">
          <div className="group-item line" />
          <h1 className="title group-item text">TV Shows</h1>
          <div className="group-item line" />
        </div>
        <TVShowsList tvShowList={tvShowList} getTVShowById={getTVShowById} />
      </div>
    </section>
  );
};

export default TVShows;
