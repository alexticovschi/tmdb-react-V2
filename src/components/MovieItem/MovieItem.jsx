import React from 'react';
import { Link } from 'react-router-dom';
import './MovieItem.scss';
import Rater from 'react-rater';

import Fade from 'react-reveal/Fade';

const MovieItem = ({ poster, id, title, releaseDate, voteAvg, mediaType }) => {
  const _id = id.toString();

  return (
    <Link
      to={`/movie-info/${_id}`}
      // to={mediaType === 'movie' ? `/movie-info/${_id}` :  `/tv-show-info/${_id}`}
      onClick={() => this.props.history.push({}`/movie-info/${_id}`)}
      className="card"
    >
      <div className="frame">
        <Fade>
          <img className="card__img" src={poster} alt="film poster" />
        </Fade>
        <div className="card__details">
          <h2 className="card__title">{title}</h2>
          <h3 className="card__release-date">{releaseDate}</h3>
          <div className="card__star-rating">
            <Rater interactive={false} total={5} rating={voteAvg / 2} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
