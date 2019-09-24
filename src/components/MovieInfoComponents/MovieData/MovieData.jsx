import React from "react";

import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Fade from "react-reveal/Fade";

import "./movieData.scss";

const not_available_poster =
  "https://dummyimage.com/342x500/7b8a91/ffffff&text=Poster+Not+Available";

const MovieData = ({ imgPath, base_url, movie, list }) => (
  <section className="movie-data">
    <div className="movie-data__box-left">
      <Fade>
        <img
          className="movie-data__img"
          src={imgPath === null ? not_available_poster : base_url + imgPath}
          alt={"movie-data poster"}
        />
      </Fade>
    </div>
    <div className="movie-data__box-right">
      <div className="">
        <div className="group movie-info">
          <div className="group-item line-left"></div>
          <h1 className="movie-data__title group-item text">
            {movie.original_title}
          </h1>
          <div className="group-item line-right"></div>
        </div>

        {list !== null ? (
          <p>
            <strong>Genre:</strong> {list}
          </p>
        ) : null}
        <div className="movie-data__star-rating">
          <strong>Rating: </strong>
          <Rater
            interactive={false}
            total={5}
            rating={movie.vote_average / 2}
          />
        </div>

        <p>
          <strong>Released: </strong> {movie.release_date}
        </p>
        <p>
          <strong>Overview: </strong> {movie.overview}
        </p>
        {movie.BoxOffice ? (
          <p>
            <strong>BoxOffice: </strong> {movie.BoxOffice}
          </p>
        ) : null}
        {movie.homepage ? (
          <p>
            <strong>Website: </strong>{" "}
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
              {movie.original_title} Official Website
            </a>
          </p>
        ) : null}

        <div className="btn-movie-info">
          <a
            className="button movie-info"
            href={`http://imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on IMDB
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default MovieData;
