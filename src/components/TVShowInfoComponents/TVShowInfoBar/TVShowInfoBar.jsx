import React from "react";
import FontAwesome from "react-fontawesome";
import Fade from "react-reveal/Fade";

import { Link } from "react-router-dom";

import "./tvShowInfoBar.scss";

const TVShowInfoBar = ({ creators, first_air_date }) => {
  return (
    <Fade>
      <section className="tvshow-info-bar">
        <div className="tvshow-info-bar__item">
          <FontAwesome className="fa-film" name="film" size="2x" />
          <span className="tvshow-info-bar__info">
            {creators.length > 1 ? "Creators" : "Creator"}:
            {creators.map(creator => (
                <Link to={`/person/${creator.id}`} className="tvshow-info-bar__creator" key={creator.id}>{creator.name}</Link>
            ))}
          </span>
        </div>
        <div className="tvshow-info-bar__item">
          <FontAwesome className="fa-calendar-alt" name="calendar" size="2x" />
          <span className="tvshow-info-bar__info">
            First Air Date: {first_air_date}
          </span>
        </div>
      </section>
    </Fade>
  );
};

export default TVShowInfoBar;
