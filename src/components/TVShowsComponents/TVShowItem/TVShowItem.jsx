import React from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import Fade from "react-reveal/Fade";

import "./TVShowItem.scss";

const TVShowItem = ({ poster, id, title, releaseDate, voteAvg }) => {
  const _id = id.toString();

  return (
    <Link
      to={`/tv-show-info/${_id}`}
      onClick={() => this.props.history.push(`/tv-show-info/${_id}`)}
      className="card"
    >
      <div className="frame">
        <Fade>
          <img className="card__img" src={poster} alt="film poster" />
        </Fade>
        <div className="details">
          <h2 className="card-title">{title}</h2>
          <h3 className="card-title">{releaseDate}</h3>
          <div className="star-rating">
            <Rater interactive={false} total={5} rating={voteAvg / 2} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TVShowItem;
