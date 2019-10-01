import React from "react";
import FontAwesome from "react-fontawesome";
import Fade from "react-reveal/Fade";
import { calcTime, convertMoney } from "../../../helpers.js";

import "./movieInfoBar.scss";

const MovieInfoBar = ({ time, budget, revenue }) => {
  return (
    <Fade>
      <section className="movie-info-bar">
        <div className="movie-info-bar__item">
          <FontAwesome className="fa-time" name="clock-o" size="2x" />
          <span className="movie-info-bar__info">
            Running time: {calcTime(time)}
          </span>
        </div>
        <div className="movie-info-bar__item">
          <FontAwesome className="fa-budget" name="money" size="2x" />
          <span className="movie-info-bar__info">
            Budget: {convertMoney(budget)}
          </span>
        </div>
        <div className="movie-info-bar__item">
          <FontAwesome className="fa-revenue" name="ticket" size="2x" />
          <span className="movie-info-bar__info">
            Revenue: {convertMoney(revenue)}
          </span>
        </div>
      </section>
    </Fade>
  );
};

export default MovieInfoBar;
